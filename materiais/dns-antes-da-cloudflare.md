# Registros DNS antes da mudança para a Cloudflare

Lidos em 02/11/2026, com os servidores de nome da Hostinger (`ns1.dns-parking.com` e `ns2.dns-parking.com`). Use esta lista para conferir a importação na Cloudflare e para desfazer a mudança, se precisar.

| Nome | Tipo | Valor | Para que serve |
|---|---|---|---|
| victormacambira.com.br | A | 185.158.133.1 | Site no Lovable |
| www.victormacambira.com.br | A | 185.158.133.1 | Site no Lovable |
| victormacambira.com.br | MX | 5 mx1.hostinger.com | E-mail da Hostinger |
| victormacambira.com.br | MX | 10 mx2.hostinger.com | E-mail da Hostinger |
| victormacambira.com.br | TXT | v=spf1 include:_spf.mail.hostinger.com ~all | E-mail (SPF) |
| _dmarc.victormacambira.com.br | TXT | v=DMARC1; p=none | E-mail (DMARC) |
| hostingermail-a._domainkey | CNAME | hostingermail-a.dkim.mail.hostinger.com | E-mail (DKIM) |
| hostingermail-b._domainkey | CNAME | hostingermail-b.dkim.mail.hostinger.com | E-mail (DKIM) |
| hostingermail-c._domainkey | CNAME | hostingermail-c.dkim.mail.hostinger.com | E-mail (DKIM) |
| autodiscover.victormacambira.com.br | CNAME | autodiscover.mail.hostinger.com | E-mail (configuração automática) |
| ftp.victormacambira.com.br | A | 185.213.81.170 | FTP da Hostinger |
| autoconfig.victormacambira.com.br | CNAME | autoconfig.mail.hostinger.com | E-mail (configuração automática) |
| _lovable.victormacambira.com.br | TXT | lovable_verify=4df5d99b4fe1789ca59a0fe07b39c334a9b3a102ad605ba0e1995dfd956c8ded | Verificação do domínio no Lovable |

Não há registro `AAAA` no domínio principal nem no `www`, como o Lovable exige.

## Cuidados na Cloudflare

- Os registros de e-mail (MX, TXT, DKIM, autodiscover) e o FTP ficam como **DNS only**, com a nuvem cinza.
- Os registros do site passam a ser o `CNAME` que o Lovable fornecer no modo proxy, com a nuvem laranja.
- Pode haver registros que esta leitura não encontra, como um TXT de verificação do Lovable. Confira a lista completa no painel da Hostinger antes de trocar os servidores de nome.

## Como desfazer

Na Hostinger, volte os servidores de nome para `ns1.dns-parking.com` e `ns2.dns-parking.com`. A volta pode levar algumas horas para chegar a todos os visitantes.
