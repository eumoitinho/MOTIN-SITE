import type { Metadata } from "next"
import { getDictionary } from "@/i18n/dictionaries"
import type { Locale } from "@/i18n/config"

export const metadata: Metadata = {
  title: "Política de Privacidade | Motin Films",
  description: "Política de Privacidade da Motin Films.",
}

export default async function PrivacyPolicyPage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale)

  return (
    <main className="pt-24 pb-16 bg-black">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Política de Privacidade</h1>

        <div className="prose prose-invert max-w-none">
          <p>Última atualização: 05 de maio de 2025</p>

          <h2>1. Introdução</h2>
          <p>
            A Motin Films ("nós", "nosso" ou "empresa") está comprometida em proteger sua privacidade. Esta Política de
            Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações pessoais quando você
            visita nosso site motinfilms.com.br ("Site") ou utiliza nossos serviços.
          </p>

          <h2>2. Informações que Coletamos</h2>
          <p>Podemos coletar os seguintes tipos de informações:</p>
          <ul>
            <li>
              <strong>Informações de Identificação Pessoal:</strong> Nome, endereço de e-mail, número de telefone,
              empresa e outras informações que você fornece voluntariamente ao preencher formulários em nosso Site.
            </li>
            <li>
              <strong>Informações de Uso:</strong> Dados sobre como você interage com nosso Site, incluindo páginas
              visitadas, tempo gasto no Site, links clicados e preferências de navegação.
            </li>
            <li>
              <strong>Informações do Dispositivo:</strong> Tipo de dispositivo, sistema operacional, tipo de navegador,
              endereço IP e identificadores de dispositivo.
            </li>
            <li>
              <strong>Cookies e Tecnologias Semelhantes:</strong> Utilizamos cookies e tecnologias semelhantes para
              coletar informações sobre sua atividade, navegador e dispositivo.
            </li>
          </ul>

          <h2>3. Como Usamos Suas Informações</h2>
          <p>Utilizamos suas informações para:</p>
          <ul>
            <li>Fornecer, manter e melhorar nossos serviços;</li>
            <li>Processar e responder às suas solicitações, consultas e formulários;</li>
            <li>
              Enviar informações sobre nossos serviços, atualizações e comunicações de marketing (com seu consentimento,
              quando exigido por lei);
            </li>
            <li>Personalizar sua experiência em nosso Site;</li>
            <li>Analisar tendências de uso e melhorar nosso Site e serviços;</li>
            <li>Detectar, prevenir e resolver problemas técnicos e de segurança;</li>
            <li>Cumprir obrigações legais.</li>
          </ul>

          <h2>4. Compartilhamento de Informações</h2>
          <p>Podemos compartilhar suas informações com:</p>
          <ul>
            <li>
              <strong>Prestadores de Serviços:</strong> Empresas que nos ajudam a operar nosso Site e fornecer serviços
              (como processamento de pagamentos, análise de dados, hospedagem de e-mail, atendimento ao cliente).
            </li>
            <li>
              <strong>Parceiros de Negócios:</strong> Podemos compartilhar informações com parceiros de negócios para
              oferecer certos produtos, serviços ou promoções.
            </li>
            <li>
              <strong>Conformidade Legal:</strong> Podemos divulgar informações quando acreditarmos, de boa fé, que a
              divulgação é necessária para cumprir a lei, proteger nossos direitos ou investigar fraudes.
            </li>
          </ul>

          <h2>5. Seus Direitos</h2>
          <p>
            Dependendo da sua localização, você pode ter os seguintes direitos em relação às suas informações pessoais:
          </p>
          <ul>
            <li>Acessar e receber uma cópia das suas informações pessoais;</li>
            <li>Retificar informações imprecisas;</li>
            <li>Solicitar a exclusão de suas informações;</li>
            <li>Restringir ou opor-se ao processamento de suas informações;</li>
            <li>Portabilidade de dados;</li>
            <li>Retirar o consentimento a qualquer momento.</li>
          </ul>

          <h2>6. Segurança</h2>
          <p>
            Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações pessoais contra
            acesso não autorizado, uso indevido, alteração ou destruição. No entanto, nenhum método de transmissão pela
            Internet ou método de armazenamento eletrônico é 100% seguro.
          </p>

          <h2>7. Retenção de Dados</h2>
          <p>
            Mantemos suas informações pessoais pelo tempo necessário para cumprir os propósitos descritos nesta Política
            de Privacidade, a menos que um período de retenção mais longo seja exigido ou permitido por lei.
          </p>

          <h2>8. Crianças</h2>
          <p>
            Nosso Site não se destina a crianças menores de 13 anos e não coletamos intencionalmente informações
            pessoais de crianças menores de 13 anos.
          </p>

          <h2>9. Alterações nesta Política</h2>
          <p>
            Podemos atualizar esta Política de Privacidade periodicamente. A versão mais recente estará sempre
            disponível em nosso Site, com a data da última atualização.
          </p>

          <h2>10. Contato</h2>
          <p>
            Se você tiver dúvidas ou preocupações sobre esta Política de Privacidade ou nossas práticas de privacidade,
            entre em contato conosco em:
          </p>
          <p>
            Motin Films
            <br />
            Rua Exemplo, 123 - Bairro
            <br />
            Curitiba - PR, 80000-000
            <br />
            contato@motinfilms.com.br
            <br />
            +55 (41) 3333-3333
          </p>
        </div>
      </div>
    </main>
  )
}
