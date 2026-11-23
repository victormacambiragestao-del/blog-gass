// Prepara os arquivos de conteudos/transcricoes/entrada para o /decompor.
// Documentos (PPT, PDF, Word) viram texto. Áudios e vídeos são transcritos no próprio computador.
// Os originais vão para conteudos/transcricoes/processadas/originais.
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, renameSync, writeFileSync } from 'node:fs';
import { basename, extname, join } from 'node:path';
import ffmpeg from 'ffmpeg-static';
import officeParser from 'officeparser';

const ENTRADA = 'conteudos/transcricoes/entrada';
const ORIGINAIS = 'conteudos/transcricoes/processadas/originais';
const TEXTO = new Set(['.txt', '.md', '.srt', '.vtt']);
const DOCUMENTOS = new Set(['.pptx', '.docx', '.pdf', '.odp', '.odt', '.xlsx']);
const MIDIA = new Set(['.mp3', '.m4a', '.wav', '.ogg', '.opus', '.aac', '.flac', '.mp4', '.mov', '.mkv', '.webm']);
const MODELO = 'onnx-community/whisper-small';

const hoje = new Date().toISOString().slice(0, 10);

function cabecalho(arquivo, tipo) {
  return `---\nfonte: ${arquivo}\ntipo: ${tipo}\npreparado_em: ${hoje}\n---\n\n`;
}

function guardarOriginal(caminho) {
  mkdirSync(ORIGINAIS, { recursive: true });
  renameSync(caminho, join(ORIGINAIS, basename(caminho)));
}

async function extrairDocumento(caminho) {
  const ast = await officeParser.parseOffice(caminho);
  const { value } = await ast.to('text');
  return value.replace(/\n{3,}/g, '\n\n').trim();
}

// Converte qualquer áudio ou vídeo para o formato que o modelo de transcrição lê: 16 kHz, mono.
function lerAudio(caminho) {
  return new Promise((resolve, reject) => {
    const processo = spawn(ffmpeg, ['-i', caminho, '-ac', '1', '-ar', '16000', '-f', 'f32le', '-loglevel', 'error', 'pipe:1']);
    const partes = [];
    let erro = '';
    processo.stdout.on('data', (parte) => partes.push(parte));
    processo.stderr.on('data', (parte) => (erro += parte));
    processo.on('close', (codigo) => {
      if (codigo !== 0) return reject(new Error(`não consegui ler o áudio: ${erro.trim()}`));
      const bytes = Buffer.concat(partes);
      resolve(new Float32Array(bytes.buffer, bytes.byteOffset, bytes.byteLength / 4));
    });
  });
}

const minutos = (segundos) => {
  const total = Math.floor(segundos ?? 0);
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
};

let transcritor;
async function transcrever(caminho) {
  if (!transcritor) {
    const { env, pipeline } = await import('@huggingface/transformers');
    env.cacheDir = '.cache/modelos';
    console.log('Carregando o modelo de transcrição. Na primeira vez, ele é baixado e pode demorar alguns minutos.');
    transcritor = await pipeline('automatic-speech-recognition', MODELO, { dtype: 'q8' });
  }
  const audio = await lerAudio(caminho);
  console.log(`  ${minutos(audio.length / 16000)} de áudio`);
  const resultado = await transcritor(audio, {
    language: 'portuguese',
    task: 'transcribe',
    chunk_length_s: 30,
    stride_length_s: 5,
    return_timestamps: true,
  });
  const trechos = resultado.chunks ?? [{ timestamp: [0], text: resultado.text }];
  return trechos.map((trecho) => `[${minutos(trecho.timestamp[0])}] ${trecho.text.trim()}`).join('\n');
}

if (!existsSync(ENTRADA)) {
  console.error(`Pasta não encontrada: ${ENTRADA}`);
  process.exit(1);
}

const arquivos = readdirSync(ENTRADA).filter((nome) => !nome.startsWith('.'));
let preparados = 0;
let falhas = 0;

for (const nome of arquivos) {
  const caminho = join(ENTRADA, nome);
  const extensao = extname(nome).toLowerCase();
  const semExtensao = basename(nome, extname(nome));

  if (TEXTO.has(extensao)) {
    console.log(`Pronto para o /decompor: ${nome}`);
    continue;
  }

  try {
    if (DOCUMENTOS.has(extensao)) {
      console.log(`Lendo documento: ${nome}`);
      const texto = await extrairDocumento(caminho);
      if (!texto) throw new Error('nenhum texto encontrado. Se for um PDF escaneado, ele precisa de OCR.');
      writeFileSync(join(ENTRADA, `${semExtensao}.md`), cabecalho(nome, 'documento') + texto + '\n');
    } else if (MIDIA.has(extensao)) {
      console.log(`Transcrevendo: ${nome}`);
      const texto = await transcrever(caminho);
      writeFileSync(join(ENTRADA, `${semExtensao}.txt`), cabecalho(nome, 'transcrição automática') + texto + '\n');
    } else {
      console.log(`Ignorado (formato não suportado): ${nome}`);
      continue;
    }
    guardarOriginal(caminho);
    preparados++;
  } catch (erro) {
    falhas++;
    console.error(`Falhou: ${nome}: ${erro.message}`);
  }
}

console.log(`\n${preparados} arquivo(s) preparado(s), ${falhas} falha(s).`);
process.exit(falhas > 0 ? 1 : 0);
