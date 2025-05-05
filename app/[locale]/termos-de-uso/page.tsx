import type { Metadata } from "next"
import { getDictionary } from "@/i18n/dictionaries"
import type { Locale } from "@/i18n/config"

export const metadata: Metadata = {
  title: "Termos de Uso | Motin Films",
  description: "Termos de Uso da Motin Films.",
}

export default async function TermsOfUsePage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale)

  return (
    <main className="pt-24 pb-16 bg-black">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Termos de Uso</h1>

        <div className="prose prose-invert max-w-none">
          <p>Última atualização: 05 de maio de 2025</p>

          <h2>1. Aceitação dos Termos</h2>
          <p>
            Ao acessar e usar o site motinfilms.com.br ("Site"), você concorda em cumprir e ficar vinculado a estes
            Termos de Uso. Se você não concordar com qualquer parte destes termos, não poderá acessar o Site.
          </p>

          <h2>2. Alterações nos Termos</h2>
          <p>
            A Motin Films reserva-se o direito de modificar ou revisar estes Termos de Uso a qualquer momento, a seu
            critério exclusivo. As alterações entrarão em vigor imediatamente após a publicação dos Termos de Uso
            atualizados no Site. Seu uso continuado do Site após tais alterações constitui sua aceitação dos novos
            Termos.
          </p>

          <h2>3. Uso do Site</h2>
          <p>
            Você concorda em usar o Site apenas para fins legais e de maneira que não infrinja os direitos de terceiros
            ou restrinja ou iniba o uso e aproveitamento do Site por qualquer terceiro. Tal restrição inclui, mas não se
            limita a:
          </p>
          <ul>
            <li>Conduta que seja ilegal ou fraudulenta, ou que tenha tal propósito ou efeito;</li>
            <li>Transmissão de qualquer material difamatório, ofensivo ou de outra forma questionável;</li>
            <li>
              Uso que possa prejudicar, sobrecarregar, danificar ou comprometer os sistemas e a segurança do Site;
            </li>
            <li>Uso de robôs, raspadores ou outros meios automáticos para acessar o Site.</li>
          </ul>

          <h2>4. Propriedade Intelectual</h2>
          <p>
            Todo o conteúdo incluído no Site, como texto, gráficos, logotipos, ícones, imagens, clipes de áudio,
            downloads digitais, compilações de dados e software, é propriedade da Motin Films ou de seus fornecedores de
            conteúdo e está protegido pelas leis de direitos autorais brasileiras e internacionais.
          </p>
          <p>
            Você não pode reproduzir, distribuir, modificar, exibir, preparar trabalhos derivados, transmitir ou
            explorar o conteúdo do Site sem a permissão prévia por escrito da Motin Films.
          </p>

          <h2>5. Contas de Usuário</h2>
          <p>
            Algumas áreas do Site podem exigir que você crie uma conta. Você é responsável por manter a
            confidencialidade de sua conta e senha e por restringir o acesso ao seu computador. Você concorda em aceitar
            a responsabilidade por todas as atividades que ocorrem em sua conta.
          </p>

          <h2>6. Privacidade</h2>
          <p>
            O uso do Site está sujeito à nossa Política de Privacidade, que está incorporada a estes Termos de Uso por
            referência.
          </p>

          <h2>7. Links para Sites de Terceiros</h2>
          <p>
            O Site pode conter links para sites de terceiros. Esses links são fornecidos apenas para sua conveniência. A
            Motin Films não tem controle sobre o conteúdo desses sites e não assume nenhuma responsabilidade por eles ou
            por qualquer perda ou dano que possa surgir do seu uso.
          </p>

          <h2>8. Limitação de Responsabilidade</h2>
          <p>
            Em nenhuma circunstância a Motin Films, seus diretores, funcionários ou agentes serão responsáveis por
            quaisquer danos diretos, indiretos, incidentais, especiais, punitivos ou consequentes decorrentes do uso ou
            da incapacidade de usar o Site.
          </p>

          <h2>9. Indenização</h2>
          <p>
            Você concorda em indenizar e isentar a Motin Films, seus diretores, funcionários e agentes de qualquer
            reclamação, responsabilidade, dano, perda e despesa, incluindo honorários advocatícios razoáveis,
            decorrentes de sua violação destes Termos de Uso.
          </p>

          <h2>10. Lei Aplicável</h2>
          <p>
            Estes Termos de Uso serão regidos e interpretados de acordo com as leis do Brasil, sem considerar seus
            princípios de conflito de leis.
          </p>

          <h2>11. Contato</h2>
          <p>Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco em:</p>
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
