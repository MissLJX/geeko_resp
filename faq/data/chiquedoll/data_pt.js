const question1 = {
  id: 'se-1',
  title: 'Onde encontrar minhas ordens?',
  parentId: 'root-1',
  richText: `
		<article>
			<header>
				<h1>Onde encontrar minhas ordens?</h1>
			</header>
			<section>
				<p>Existem dois tipos de contas que você pode ter aqui em ${window.sitename}, uma conta registrada e uma conta no Facebook. Por favor, certifique-se de ter feito o login na conta certa. Depois de ter feito isso, você pode acessar seu pedido.</p>
				<img src="https://image.geeko.ltd/chicme/20210107c/chiquedoll-faq.jpg">
			</section>
		</article>
	`
}

const question2 = {
  id: 'se-2',
  title: 'Como faço para enviar um ticket?',
  parentId: 'root-1',
  richText: `
		<article>
			<header>
				<h1>Como faço para enviar um ticket?</h1>
			</header>
			<section>
				<p>Um bilhete é usado para entrar em contato com nossa equipe de suporte ao cliente. Por favor, envie um ticket se você tiver alguma dúvida sobre o seu pedido. Siga os passos abaixo:</p>
				<ol>
					<li>
						<h2>PASSO 1:</h2>
						<p>Entre na sua conta e selecione "pedidos". Então, por favor clique em "contato vendedor"</p>
						<img src="https://s3-us-west-2.amazonaws.com/image.chic-fusion.com/faq/howdoisubmitaticket.png">
					</li>
					<li>
						<h2>PASSO 2:</h2>
						<p>Selecione o tópico mais relacionado ao seu problema.E envie sua mensagem.</p>
						<img src="https://s3-us-west-2.amazonaws.com/image.chic-fusion.com/faq/step2.png">
					</li>
				</ol>
			</section>
		</article>
	`
}

const question3 = {
  id: 'se-3',
  title: 'Como faço para alterar detalhes na minha conta '+ window.sitename +'?',
  parentId: 'root-1',
  richText: `
		<article>
			<header>
				<h1>Como faço para alterar detalhes na minha conta ${window.sitename}?</h1>
			</header>
			<section>
				<p>1. Clique em "Fazer login" no canto superior direito da nossa página inicial.</p>
				<p>2. Selecione "Configurações" em sua conta e altere os detalhes</p>
				<ol>
					<li>
						<p>Mudar sua senha:</p>
						<img src="https://s3-us-west-2.amazonaws.com/image.chic-fusion.com/faq/changeyourpwd.png">
					</li>
					<li>
						<p>Editar / Adicionar endereço de envio:</p>
						<img src="https://s3-us-west-2.amazonaws.com/image.chic-fusion.com/faq/addshipping.png">
					</li>
					<li>
						<p> Altere seu endereço de e-mail</p>
						<img src="https://s3-us-west-2.amazonaws.com/image.chic-fusion.com/faq/changeyouremail.png">
					</li>
					<li>
						<p>Browsing history</p>
					</li>
					<li>
						<p>Delete conta/p>
					</li>
				</ol>
			</section>
		</article>
	`
}

const question4 = {
  id: 'se-4',
  title: 'Como faço para redefinir minha senha?',
  parentId: 'root-1',
  richText: `
		<article>
			<header>
				<h1>Como faço para redefinir minha senha?</h1>
			</header>
			<section>
				<p>A senha precisa ser alterada ou redefinida on-line pelo cliente. Você pode seguir as etapas abaixo:</p>
				<ol>
					<li>
						Clique em "Fazer login" no canto superior direito da nossa página inicial.
					</li>
					<li>
						Selecione "esqueceu sua senha"
					</li>
					<li>
						Digite seu endereço de e-mail registrado na caixa fornecida.
					</li>
					<li>
						Você pode receber o e-mail de redefinição e criará uma nova senha com o link. Por favor verifique também a sua pasta de lixo eletrônico se você não conseguir localizar nossos e-mails.
					</li>
					<li>
						Digite a nova senha para entrar em sua conta.
					</li>
				</ol>
			</section>
		</article>
	`
}

const question5 = {
  id: 'se-5',
  title: 'Por que não consigo fazer login na minha conta do '+ window.sitename +'?',
  parentId: 'root-1',
  richText: `
		<article>
			<header>
				<h1>Por que não consigo fazer login na minha conta do ${window.sitename}?</h1>
			</header>
			<section>
				<p>
				Por favor, verifique se você digitou o endereço de e-mail correto e senha.
                Se você fizer login pelo Facebook com o mesmo endereço de e-mail na primeira vez, faça login pela sua conta do Facebook.
				</p>
			</section>
		</article>
	`
}

const question6 = {
  id: 'se-6',
  title: 'Posso entrar com minha conta do Facebook?',
  parentId: 'root-1',
  richText: `
		<article>
			<header>
				<h1>Posso entrar com minha conta do Facebook?</h1>
			</header>
			<section>
				<p>
					Entrar com o Facebook é outra opção que oferecemos aos nossos clientes. É rápido e fácil e não requer que você digite seu nome de usuário e senha toda vez. Se você entrar com sua conta do Facebook, você terá acesso a ofertas e promoções exclusivas, como votar em novos designs e compartilhar sua opinião.
				</p>
			</section>
		</article>
	`
}

const question7 = {
  id: 'se-7',
  title: 'Tenho que me registrar para fazer um pedido?',
  parentId: 'root-1',
  richText: `
		<article>
			<header>
				<h1>Tenho que me registrar para fazer um pedido?</h1>
			</header>
			<section>
				<p>
					Registrar-se no ${window.sitename} traz muitos benefícios e tornará sua experiência de compra fácil e eficiente. Antes de fazer um pedido, você precisará se registrar. Para se inscrever, insira seu endereço de e-mail, crie uma senha e aguarde o e-mail de confirmação da ${window.sitename}, leia o e-mail para mais instruções. Por favor, verifique se o endereço de e-mail que você usa está digitado corretamente
				</p>
			</section>
		</article>
	`
}

const question8 = {
  id: 'se-8',
  title: 'Como posso cancelar o pedido pago?',
  parentId: 'root-2',
  richText: `
		<article>
			<header>
				<h1>Como posso cancelar o pedido pago?</h1>
			</header>
			<section>
				<p>
					Para cancelar um pedido pago, você precisará enviar um ticket clicando no botão "Meus tickets" e enviar todas as informações necessárias.
				</p>
				<p>
					Aqui no ${window.sitename}, o pedido só pode ser cancelado antes do embarque. Em outras palavras, uma vez que você receba nosso aviso de embarque, o pedido não pode ser cancelado. Então, por favor, aguarde o seu pacote chegar e você pode mantê-lo ou entre em contato conosco para organizar "retorno para reembolso".
				</p>
				<p>
					Se você sentir que precisa cancelar o pedido imediatamente, clique no botão "Ajuda on-line" na parte superior da página inicial.
				</p>
			</section>
		</article>
	`
}

const question9 = {
  id: 'se-9',
  title: 'Por que não recebi um e-mail sobre o envio do meu pedido?',
  parentId: 'root-2',
  richText: `
		<article>
			<header>
				<h1>Por que não recebi um e-mail sobre o envio do meu pedido?</h1>
			</header>
			<section>
				<p>
					Normalmente levará de 3 a 7 dias úteis para preparação antes do envio.
				</p>
				<p>
					Informaremos você com um e-mail após o envio ou se houver algum atraso. Você poderá verificar primeiro o lixo eletrônico se não o recebeu.
				</p>
				<p>
					Se você não conseguir encontrar um e-mail quinze dias depois de ter feito o pedido, por favor, envie um e-mail para o atendimento ao cliente do ${window.sitename}.
				</p>
			</section>
		</article>
	`
}

const question10 = {
  id: 'se-10',
  title: 'Como faço para alterar meu endereço de entrega depois que meu pedido é feito?',
  parentId: 'root-2',
  richText: `
		<article>
			<header>
				<h1>Como faço para alterar meu endereço de entrega depois que meu pedido é feito?</h1>
			</header>
			<section>
				<p>
				Só podemos atualizar seu endereço de entrega antes do envio.
				</p>
				<p>
					Para garantir que seu pacote possa ser entregue adequadamente, certifique-se de que seu endereço esteja completo e correto com todas as informações, incluindo números de apartamentos / suítes / quartos.
				</p>
				<p>
					<strong>Após o envio do seu pacote, não poderemos alterar o endereço de envio. E não podemos cancelar um pedido após o envio. Por favor, fique de olho no status do pedido, marcando "Meus pedidos" para garantir que você possa receber seu pedido.
				</p>
			</section>
		</article>
	`
}

const question11 = {
  id: 'se-11',
  title: 'Como posso mudar meu pedido?',
  parentId: 'root-2',
  richText: `
		<article>
			<header>
				<h1>Como posso mudar meu pedido?</h1>
			</header>
			<section>
				<p>
					Por favor, note que podemos ajudá-lo a modificar o seu pedido antes do envio.
				</p>
				<p>
					Inclui alterar o tamanho ou a cor de um item, removendo um item, alterando o endereço de envio.
				</p>
				<p>
					<strong>Depois que o seu pacote for enviado, não poderemos alterar nada.</strong>
				</p>
			</section>
		</article>
	`
}

const question12 = {
  id: 'se-12',
  title: 'O que devo fazer se eu não receber um email de confirmação?',
  parentId: 'root-2',
  richText: `
		<article>
			<header>
				<h1>O que devo fazer se eu não receber um email de confirmação?</h1>
			</header>
			<section>
				<p>
					Se você não recebeu um e-mail de confirmação sobre seu pedido, você pode ter registrado seu e-mail incorretamente ou o e-mail pode estar na sua pasta de spam. Você pode entrar em sua conta ${window.sitename} e clicar no botão "Meus pedidos" para ver seus pedidos. Você também pode enviar um ingresso on-line para obter mais informações sobre seu pedido.
				</p>
			</section>
		</article>
	`
}

const question13 = {
  id: 'se-13',
  title: 'Quanto tempo demora a minha encomenda chegar?',
  parentId: 'root-2',
  richText: `
		<article>
			<header>
				<h1>Quanto tempo demora a minha encomenda chegar?</h1>
			</header>
			<section>
				<p>
					Aqui no ${window.sitename}, temos orgulho e nos esforçamos para garantir que todos os pacotes sejam entregues em tempo hábil. Normalmente, você receberá seu pedido entre 7 e 25 dias úteis a partir da data de sua colocação.
				</p>
				<p>
					<strong>Os dias de entrega = dias de processamento + dias de envio.</strong>
				</p>
				<p>Você pode verificar o status do pedido no botão "Meus pedidos".</p>
				<p>Mais informações por favor clique neste link:<a href="https://www.${window.sitename}.com/fs/shipping-policy?isouter=1">https://www.${window.sitename}.com/fs/shipping-policy-pc</a></p>
			</section>
		</article>
	`
}

const question14 = {
  id: 'se-14',
  title: 'Como faço para acompanhar meus pedidos?',
  parentId: 'root-2',
  richText: `
		<article>
			<header>
				<h1>Como faço para acompanhar meus pedidos?</h1>
			</header>
			<section>
				<p>
					Acompanhar o seu pacote é fácil. Você pode entrar em sua conta ${window.sitename} e encontrar todas as informações do seu pedido. Clique em "Meus Pedidos" e clique em "Visualizar Detalhes" para descobrir onde está seu pacote. Você também pode enviar um ticket para verificar as informações do seu pedido.
				</p>
			</section>
		</article>
	`
}

const question15 = {
  id: 'se-15',
  title: 'Eu preciso pagar pelas fantasias?',
  parentId: 'root-2',
  richText: `
		<article>
			<header>
				<h1>Eu preciso pagar pelas fantasias?</h1>
			</header>
			<section>
				<p>
					O imposto não está incluído no que você pagou para eles. Colocaremos o valor na fatura o mais baixo possível, mas a necessidade do cliente de pagar o imposto se houver um imposto no envio.
				</p>
			</section>
		</article>
	`
}

const question16 = {
  id: 'se-16',
  title: 'Como alterar o endereço de cobrança?',
  parentId: 'root-2',
  richText: `
		<article>
			<header>
				<h1>Como alterar o endereço de cobrança?</h1>
			</header>
			<section>
				<p>
					Em nosso sistema, o endereço de faturamento será gerado automaticamente para o mesmo que o endereço de envio.
				</p>
				<p>
					Nós apenas enviaremos o pedido para o endereço de entrega que você deixou em nosso site.
				</p>
				<p>
				    Portanto, o endereço de entrega deve ser o mesmo com o endereço de cobrança, se você quiser alterar o endereço de cobrança, você precisa chamar sua proibição para um cheque.
				</p>
			</section>
		</article>
	`
}

const question17 = {
  id: 'se-17',
  title: 'Onde coloco o cupom de desconto?',
  parentId: 'root-2',
  richText: `
		<article>
			<header>
				<h1>Onde coloco o cupom de desconto?</h1>
			</header>
			<section>
				<p>
					Antes do check-out, você pode adicionar o código de cupom que você tem no cupom em branco
				</p>
				<p>
					Se você quiser alterar a cor ou o tamanho do item que você pediu, você precisa entrar em contato com o nosso serviço ao cliente, antes do embarque, podemos mudá-lo para você.
				</p>
			</section>
		</article>
	`
}

const question18 = {
  id: 'se-18',
  title: 'Por que não recebi uma confirmação sobre meu pedido?',
  parentId: 'root-2',
  richText: `
		<article>
			<header>
				<h1>Por que não recebi uma confirmação sobre meu pedido?</h1>
			</header>
			<section>
				<p>
					Se você entrar com um e-mail normal quando fizer um pedido, receberá uma confirmação do pedido em 24 horas. Você poderá verificar o lixo eletrônico primeiro se não o recebeu. Se ainda não houver nada depois de um cheque, você pode entrar em contato com o nosso serviço ao cliente.
				</p>
			</section>
		</article>
	`
}

const question19 = {
  id: 'se-19',
  title: 'Posso obter um cupom de desconto para o meu primeiro pedido?',
  parentId: 'root-2',
  richText: `
		<article>
			<header>
				<h1>Posso obter um cupom de desconto para o meu primeiro pedido?</h1>
			</header>
			<section>
				<p>
					Se você se inscrever no nosso site pela primeira vez, você receberá um e-mail para o cupom de desconto, você pode adicioná-lo no cupom de desconto em branco antes de fazer o check out
				</p>
			</section>
		</article>
	`
}

const question20 = {
  id: 'se-20',
  title: 'Como posso fazer um pedido? Como fazer um pedido?',
  parentId: 'root-2',
  richText: `
		<article>
			<header>
				<h1>Como posso fazer um pedido? Como fazer um pedido?</h1>
			</header>
			<section>
				<p>
					Este é o passo de como fazer um pedido:
				</p>
				<p>
					Passo 1: Para adicionar um item ao seu carrinho, basta selecionar o botão "Adicionar ao saco". Não se esqueça de escolher o tamanho e a cor antes de adicionar um item à sua bolsa.
				</p>
				<p>
					Passo 2: Depois de completar a sua seleção de itens, clique em "VER SACO" para uma prévia do seu pedido. A partir daqui, você pode rever o seu pedido e alterar a quantidade, se necessário, editar o endereço, escolher a empresa de transporte
				</p>
				<p>
					Etapa 3: escolha paypal ou cartão de crédito para pagar pelo seu pedido e, por fim, preencha suas informações de pagamento e clique em "Pagar" para concluir sua compra.
				</p>
			</section>
		</article>
	`
}

const question21 = {
  id: 'se-21',
  title: 'Você aceita dinheiro na entrega?',
  parentId: 'root-3',
  richText: `
		<article>
			<header>
				<h1>Você aceita dinheiro na entrega?</h1>
			</header>
			<section>
				<p>
					Desculpe por isso, não aceitamos dinheiro na entrega. O cliente precisa pagar on-line. Podemos aceitar PayPal, Visa e MasterCard. Não podemos aceitar o vale de oferta.
				</p>
			</section>
		</article>
	`
}

const question22 = {
  id: 'se-22',
  title: 'Posso usar um vale-presente para pagar?',
  parentId: 'root-3',
  richText: `
		<article>
			<header>
				<h1>Posso usar um vale-presente para pagar?</h1>
			</header>
			<section>
				<p>
					O cliente precisa pagar por isso online. Podemos aceitar PayPal, Visa e MasterCard. Não podemos aceitar o vale de oferta.
				</p>
			</section>
		</article>
	`
}

const question23 = {
  id: 'se-23',
  title: 'Por que meu pagamento continua recusado?',
  parentId: 'root-3',
  richText: `
		<article>
			<header>
				<h1>Por que meu pagamento continua recusado?</h1>
			</header>
			<section>
				<p>
					Devido à segurança da conta, os motivos declinados podem ser diferentes. O Chat Me pode aceitar PayPal, Visa e MasterCard.
				</p>
				<p>
				     Por favor, verifique os detalhes do cartão em sua conta ${window.sitename} para se certificar de que as informações fornecidas estão corretas. Preste atenção ao endereço de cobrança, o endereço de cobrança deve ser o mesmo com o endereço de entrega.
                </p>
				<p>
				    O emissor do seu cartão pode ter recusado seu pagamento. Como eles não nos informam o motivo, é melhor consultar o emissor do cartão para obter detalhes. Se possível, também recomendamos que você tente pagar com o PayPal.
			</section>
		</article>
	`
}

const question24 = {
  id: 'se-24',
  title: 'Posso aplicar vários códigos de desconto?',
  parentId: 'root-3',
  richText: `
		<article>
			<header>
				<h1>Posso aplicar vários códigos de desconto?</h1>
			</header>
			<section>
				<p>
					Apenas um código de cupom é elegível por pedido.
				</p>
				<p>
				   Também é muito conveniente aplicar o cupom ao seu pedido.
                </p>
                <p>
                   Depois de fazer o check-out no carrinho de compras, abaixo do Resumo do pedido, insira seu código de cupom e, em seguida, aplique-o. O cupom será aplicado com sucesso:
                </p>
                <img src="https://s3-us-west-2.amazonaws.com/image.chic-fusion.com/faq/amienabletopay.png">
			</section>
		</article>
	`
}

const question25 = {
  id: 'se-25',
  title: 'Por que meus créditos são inválidos?',
  parentId: 'root-3',
  richText: `
		<article>
			<header>
				<h1>Por que meus créditos são inválidos?</h1>
			</header>
			<section>
				<p>
					Os usuários não podem receber mais de 200 créditos por dia, sem contar os créditos recebidos como resultado de compras.
				</p>
				<p>
					O valor do crédito aplicado a um pedido não pode exceder 4% do valor do pedido
Créditos serão expirados em 12 meses
				</p>
				<p>
					100 créditos iguais a $ 1 USD
				</p>
				<p>
					O crédito não se aplica ao custo de frete
				</p>
			</section>
		</article>
	`
}
const question26 = {
  id: 'se-26',
  title: 'Por que estou sendo solicitado a autorizar meu pedido?',
  parentId: 'root-3',
  richText: `
		<article>
			<header>
				<h1>Por que estou sendo solicitado a autorizar meu pedido?</h1>
			</header>
			<section>
				<p>
					Informações pessoais detalhadas podem ser necessárias para autorizar seu pedido. Se você foi solicitado a autorizar seu pedido, ele foi selecionado aleatoriamente e colocado em espera por nossa equipe de prevenção contra fraudes para verificação adicional. É nossa responsabilidade proteger nossos compradores de qualquer faturamento indesejado. Se o pedido não tiver sido autorizado após uma semana, somos forçados a acreditar que ele é fraudulento e o pedido estará sujeito a cancelamento sem aviso prévio.
				</p>
			</section>
		</article>
	`
}

const question27 = {
  id: 'se-27',
  title: 'Posso usar meus pontos de bônus '+ window.sitename +', dinheiro da Google Wallet e um código de cupom ao mesmo tempo?',
  parentId: 'root-3',
  richText: `
		<article>
			<header>
				<h1>Posso usar meus pontos de bônus ${window.sitename}, dinheiro da Google Wallet e um código de cupom ao mesmo tempo?</h1>
			</header>
			<section>
				<p>
					Sim! É claro que você pode aplicar todos os três pontos de bônus, dinheiro da Google Wallet e código de cupom, tudo ao mesmo tempo.
				</p>
			</section>
		</article>
	`
}

const question28 = {
  id: 'se-28',
  title: 'Por que não posso pagar pelo meu cartão?',
  parentId: 'root-3',
  richText: `
		<article>
			<header>
				<h1>Por que não posso pagar pelo meu cartão?</h1>
			</header>
			<section>
				<p>
				Devido à segurança da conta, os motivos recusados ​​podem ser diferentes.
				</p>
				<p>
					Por favor, verifique os detalhes do cartão em sua conta ${window.sitename} para se certificar de que as informações fornecidas estão corretas. Preste atenção ao endereço de cobrança, o endereço de cobrança deve ser o mesmo com o endereço de entrega.
				</p>
				<p>
				O emissor do seu cartão pode ter recusado seu pagamento. Como eles não nos informam o motivo, é melhor consultar o emissor do cartão para obter detalhes. Se possível, também recomendamos que você tente pagar com o PayPal.
				</p>
			</section>
		</article>
	`
}

const question29 = {
  id: 'se-29',
  title: 'Por que meu cartão continua recusado?',
  parentId: 'root-3',
  richText: `
		<article>
			<header>
				<h1>Por que meu cartão continua recusado?</h1>
			</header>
			<section>
				<p>
					Devido à segurança da conta, os motivos recusados ​​podem ser diferentes.
				</p>
				<p>
					Por favor, verifique os detalhes do cartão em sua conta ${window.sitename} para se certificar de que as informações fornecidas estão corretas. Preste atenção ao endereço de cobrança, o endereço de cobrança deve ser o mesmo com o endereço de entrega.
				</p>
				<p>
					O emissor do seu cartão pode ter recusado seu pagamento. Como eles não nos informam o motivo, é melhor consultar o emissor do cartão para obter detalhes. Se possível, também recomendamos que você tente pagar com o PayPal.
				</p>
			</section>
		</article>
	`
}

const question30 = {
  id: 'se-30',
  title: 'Posso usar o paypal para pagar?',
  parentId: 'root-3',
  richText: `
		<article>
			<header>
				<h1>Posso usar o paypal para pagar?</h1>
			</header>
			<section>
				<p>
					Sim, você pode usar o paypal para pagar, seria mais fácil do que o cartão. O cliente precisa pagar por isso online. Podemos aceitar PayPal, Visa e MasterCard. Não podemos aceitar o vale de oferta.
				</p>
			</section>
		</article>
	`
}

const question31 = {
  id: 'se-31',
  title: 'Qual o pagamento que você pode aceitar?',
  parentId: 'root-3',
  richText: `
		<article>
			<header>
				<h1>Qual o pagamento que você pode aceitar?</h1>
			</header>
			<section>
				<p>
					O cliente precisa pagar por isso online. Podemos aceitar PayPal, Visa e MasterCard. Não podemos aceitar o vale de oferta.
				</p>
			</section>
		</article>
	`
}

const question32 = {
  id: 'se-32',
  title: 'Posso ligar para você para fazer um pedido?',
  parentId: 'root-3',
  richText: `
		<article>
			<header>
				<h1>Posso ligar para você para fazer um pedido?</h1>
			</header>
			<section>
				<p>
					Não aceitamos pedidos por telefone
O cliente precisa pagar por isso online. Podemos aceitar PayPal, Visa e MasterCard. Não podemos aceitar o vale de oferta
				</p>
			</section>
		</article>
	`
}

const question33 = {
  id: 'se-33',
  title: 'Por que existem tantos produtos de tamanho único?',
  parentId: 'root-4',
  richText: `
		<article>
			<header>
				<h1>Por que existem tantos produtos de tamanho único?</h1>
			</header>
			<section>
				<p>
					Geralmente design de produtos de um tamanho com ombro estreito e bainha larga para mostrar boa aparência. Um tamanho não significa que ele se encaixa em todos, mas significa que ele tem apenas um tamanho.
				</p>
				<p>
					Sinceramente, sugerimos a cada cliente que meça cuidadosamente a figura do seu corpo antes de fazer o pedido. Além disso, você pode ler a referência de tamanho na descrição e, em seguida, tomar uma decisão.
				</p>
			</section>
		</article>
	`
}
const question34 = {
  id: 'se-34',
  title: 'O que significa tamanho único?',
  parentId: 'root-4',
  richText: `
		<article>
			<header>
				<h1>O que significa tamanho único?</h1>
			</header>
			<section>
				<p>
					Um tamanho não significa que o item vai caber todos, no entanto, significa que o item vem apenas em um tamanho. A fim de satisfazer a satisfação de cada cliente, itens diferentes serão feitos em tamanhos diferentes. Os detalhes do tamanho serão mostrados em cada página do produto. Por favor, tome as medidas de tamanho em consideração antes de fazer um ped
				</p>
			</section>
		</article>
	`
}

const question35 = {
  id: 'se-35',
  title: 'Como escolho o tamanho?',
  parentId: 'root-4',
  richText: `
		<article>
			<header>
				<h1>Como escolho o tamanho?</h1>
			</header>
			<section>
				<p>
Nós temos o gráfico de tamanho para cada item, e por favor, consulte cuidadosamente o gráfico de tamanho antes de comprar qualquer um, e também haverá diferença de 1 a 3 cm. Nosso tamanho é tamanho asiático por isso pode ser um pouco menor do que o seu
				</p>
				<p>
				Além disso, os itens estão todos em diferentes estilos e texturas, portanto, existem diferenças inevitavelmente. Por favor, nos dê uma compreensão
				</p>
				<img src="https://s3-us-west-2.amazonaws.com/image.chic-fusion.com/faq/howdoichoosethesize.png">
			</section>
		</article>
	`
}
const question36 = {
  id: 'se-36',
  title: 'Onde os itens são feitos?',
  parentId: 'root-4',
  richText: `
		<article>
			<header>
				<h1>Onde os itens são feitos?</h1>
			</header>
			<section>
				<p>
					Nós somos da China, temos o armazém nos EUA. Os produtos serão enviados de um desses armazéns de acordo com a disponibilidade de estoque, bem como o princípio da proximidade.
				</p>
			</section>
		</article>
	`
}

const question37 = {
  id: 'se-37',
  title: 'Onde você está localizado?',
  parentId: 'root-4',
  richText: `
		<article>
			<header>
				<h1>Onde você está localizado?</h1>
			</header>
			<section>
				<p>Temos o armazém nos EUA. Os produtos serão enviados de um desses armazéns de acordo com a disponibilidade de estoque, bem como com o princípio de proximidade.
				</p>
			</section>
		</article>
	`
}

const question38 = {
  id: 'se-38',
  title: 'Posso obter uma diferença para um item de desconto?',
  parentId: 'root-4',
  richText: `
		<article>
			<header>
				<h1>Posso obter uma diferença para um item de desconto?</h1>
			</header>
			<section>
				<p>
					Pedimos desculpas pelo inconveniente, no entanto, o preço será alterado em promoção diferente, por isso, não podemos reembolsá-lo sobre a diferença. A ${window.sitename} se reserva o direito de alterar a promoção a qualquer momento, a nosso exclusivo critério.
				</p>
			</section>
		</article>
	`
}

const question39 = {
  id: 'se-39',
  title: 'Onde posso encontrar seus produtos mais recentes?',
  parentId: 'root-4',
  richText: `
		<article>
			<header>
				<h1>Onde posso encontrar seus produtos mais recentes?</h1>
			</header>
			<section>
				<p>
					Novos produtos são atualizados todos os dias em nosso site para atender aos estilos de diferentes clientes. Encontre nossos estilos mais recentes clicando em "O que há de novo" em nossa página inicial.
				</p>
			</section>
		</article>
	`
}

const question40 = {
  id: 'se-40',
  title: 'Você reabastecerá itens que foram vendidos?',
  parentId: 'root-4',
  richText: `
		<article>
			<header>
				<h1>Você reabastecerá itens que foram vendidos?</h1>
			</header>
			<section>
				<p>
					Se um item estiver marcado como "Esgotado", sugerimos que você visite com frequência para ver se ele foi reabastecido. Se o item ainda estiver em falta após uma semana, é mais provável que ele seja removido do nosso inventário.
				</p>
			</section>
		</article>
	`
}

const question41 = {
  id: 'se-41',
  title: 'Você usa pele de animais ou couro genuíno?',
  parentId: 'root-4',
  richText: `
		<article>
			<header>
				<h1>Você usa pele de animais ou couro genuíno?</h1>
			</header>
			<section>
				<p>
					Nossos produtos não são nem pele real nem couro genuíno, mas são materiais artificiais de alta qualidade.
				</p>
			</section>
		</article>
	`
}

const question42 = {
  id: 'se-42',
  title: 'Por que o preço deste item é maior do que eu vi antes?',
  parentId: 'root-4',
  richText: `
		<article>
			<header>
				<h1>Por que o preço deste item é maior do que eu vi antes?</h1>
			</header>
			<section>
				<p>
					Pedimos desculpas por este inconveniente, no entanto, o preço será alterado em diferentes promoções. A ${window.sitename} reserva-se o direito de alterar a promoção a qualquer momento, a nosso exclusivo critério.
				</p>
			</section>
		</article>
	`
}

const question43 = {
  id: 'se-43',
  title: 'Como alterar meu endereço de entrega?',
  parentId: 'root-5',
  richText: `
		<article>
			<header>
				<h1>Como alterar meu endereço de entrega?</h1>
			</header>
			<section>
				<p>
					Se o seu pedido for pago com sucesso, você não poderá alterá-lo diretamente.
				</p>
				<p>
					Continue a enviar um ticket ou entre em contato com a ajuda on-line e nós podemos ajudá-lo a alterar o endereço de entrega antes do envio.
				</p>
				<p>
					Se você quiser gerenciar o seu catálogo de endereços para compra futura, entre na sua conta ${window.sitename} e encontre o "Livro de Endereços" para fazer uma verificação detalhada.
				</p>
				<img src="https://s3-us-west-2.amazonaws.com/image.chic-fusion.com/faq/addshipping.png">
			</section>
		</article>
	`
}

const question44 = {
  id: 'se-44',
  title: 'Por que o número de rastreamento não está funcionando?',
  parentId: 'root-5',
  richText: `
		<article>
			<header>
				<h1>Por que o número de rastreamento não está funcionando?</h1>
			</header>
			<section>
				<p>
					Quando nós enviamos nossos pacotes para você, não há mais atualizações da companhia de navegação, devido ao fato de que seu pacote está em trânsito. Uma vez que tenha atingido o próximo recurso de classificação, ele será atualizado. Pode levar alguns dias (1 a 7 dias) para ver qualquer atividade depois que ela for enviada para fora do nosso destino.
				</p>
			</section>
		</article>
	`
}
const question45 = {
  id: 'se-45',
  title: 'Quando meu pedido chegará?',
  parentId: 'root-5',
  richText: `
		<article>
			<header>
				<h1>Quando meu pedido chegará?</h1>
			</header>
			<section>
				<p>
					Para cada método de envio, precisamos de 3-7 dias úteis para preparar o pedido.
A remessa leva de 7 a 25 dias úteis para chegar aos países de destino.
				</p>
				<p>
				    Por favor note: Tempo Total de Entrega = Tempo de Processamento + Tempo de Envio
                </p>
                <p>
                Para a data de chegada prevista, consulte <a href="https://www.${window.sitename}.com/fs/shipping-policy?isouter=1">http://www.${window.sitename}.com/fs/shipping-policy-pc</a>
                </p>
			</section>
		</article>
	`
}
const question46 = {
  id: 'se-46',
  title: 'Por que minhas informações de frete não foram atualizadas?',
  parentId: 'root-5',
  richText: `
		<article>
			<header>
				<h1>Por que minhas informações de frete não foram atualizadas?</h1>
			</header>
			<section>
				<p>
					Depois de enviarmos o pacote para você, as informações de envio serão atualizadas depois que ele chegar ao próximo centro de classificação, o que pode levar alguns dias. Em seguida, você pode fazer login na sua conta e encontrar "Meus pedidos" para verificar o status do pedido e rastrear.to check the order status and track.
				</p>
				<p>
				   Para a data de chegada prevista, consulte  <a href="https://www.${window.sitename}.com/fs/shipping-policy?isouter=1">http://www.${window.sitename}.com/fs/shipping-policy-pc</a>
                </p>
			</section>
		</article>
	`
}
const question47 = {
  id: 'se-47',
  title: 'Por que eu tenho que pagar pelos custos extras?',
  parentId: 'root-5',
  richText: `
		<article>
			<header>
				<h1>Por que eu tenho que pagar pelos custos extras?</h1>
			</header>
			<section>
				<p>
					Existem diferentes costumes e impostos para cada país. Se você é cobrado de tarifas, por favor envie-nos uma foto do recibo, e nós lhe ofereceremos uma compensação apropriada.
				</p>
			</section>
		</article>
	`
}
const question48 = {
  id: 'se-48',
  title: 'Como é que o meu pacote é entregue, mas ainda não recebi o meu pacote?',
  parentId: 'root-5',
  richText: `
		<article>
			<header>
				<h1>Como é que o meu pacote é entregue, mas ainda não recebi o meu pacote?</h1>
			</header>
			<section>
				<p>
					Os pacotes podem ser entregues na sua caixa de correio ou assinados pelos seus vizinhos. Sugerimos que você verifique sua caixa de correio e seus vizinhos e famílias primeiro. Se você não conseguir encontrá-lo, verifique o seu pacote com a empresa de transporte. Lembre-se de trazer seu número de rastreamento! Se você ainda não conseguir encontrar o pacote, não hesite em entrar em contato com o Atendimento ao Cliente da ${window.sitename}.
				</p>
			</section>
		</article>
	`
}
const question49 = {
  id: 'se-49',
  title: 'Por que meu pedido foi enviado separadamente?',
  parentId: 'root-5',
  richText: `
		<article>
			<header>
				<h1>Por que meu pedido foi enviado separadamente?</h1>
			</header>
			<section>
				<p>
					Nós enviaremos seu pedido o mais rápido possível. Portanto, seu pedido pode ter sido enviado separadamente devido ao estoque.
				</p>
			</section>
		</article>
	`
}
const question50 = {
  id: 'se-50',
  title: 'Por que meu pacote foi devolvido?',
  parentId: 'root-5',
  richText: `
		<article>
			<header>
				<h1>Por que meu pacote foi devolvido?</h1>
			</header>
			<section>
				<p>
					Existem vários motivos pelos quais o seu pacote pode ter sido devolvido para nós.  
				</p>
				<p>
					1. Endereço incorreto ou incompleto
				</p>
				<p>
					2. Número de telefone inválido
				</p>
				<p>
					 3. Não é possível entregar
				</p>
				<p>
					Entre em contato com a empresa de transporte para obter mais informações ou envie um tíquete para que possamos ajudá-lo melhor.
				</p>
			</section>
		</article>
	`
}
const question51 = {
  id: 'se-51',
  title: 'Preciso estar no meu endereço de remessa quando meu pacote for entregue?',
  parentId: 'root-5',
  richText: `
		<article>
			<header>
				<h1>Preciso estar no meu endereço de remessa quando meu pacote for entregue?</h1>
			</header>
			<section>
				<p>
					Às vezes, seu pacote requer uma assinatura para ser entregue. Você pode entrar em contato com a empresa de transporte e pedir detalhes sobre o pacote com o número de rastreamento que fornecemos. Se você perdeu a entrega, entre em contato com a empresa de transporte para que eles sejam entregues novamente ou para que você pegue o pacote.
				</p>
			</section>
		</article>
	`
}
const question52 = {
  id: 'se-52',
  title: 'O que devo fazer quando as atualizações de rastreamento mostram que meu pacote foi retornado?',
  parentId: 'root-5',
  richText: `
		<article>
			<header>
				<h1>O que devo fazer quando as atualizações de rastreamento mostram que meu pacote foi retornado?</h1>
			</header>
			<section>
				<p>
					PEntre em contato com a empresa de transporte e lembre-se de fornecer seu número de rastreamento para obter mais informações. Se ainda não conseguir encontrar o seu pacote, entre em contato com o atendimento ao cliente do ${window.sitename} o mais rápido possível enviando um ingresso. Ficaremos mais do que felizes em resolver esse problema.
				</p>
			</section>
		</article>
	`
}
const question53 = {
  id: 'se-53',
  title: 'O que acontece se eu não estiver em casa quando fizer a entrega?',
  parentId: 'root-5',
  richText: `
		<article>
			<header>
				<h1>O que acontece se eu não estiver em casa quando fizer a entrega?</h1>
			</header>
			<section>
				<p>
					A assinatura pode ser necessária quando o pacote for entregue, por isso é preferível que você ou outra pessoa esteja em casa.
				</p>
				<p>
					Mas se você perdeu o seu pacote, por favor, verifique com sua companhia de navegação local ou correios com o número de rastreamento para pegar o seu pacote o mais rapidamente possível.
                </p>
			</section>
		</article>
	`
}
const question54 = {
  id: 'se-54',
  title: 'Existem taxas adicionais?',
  parentId: 'root-5',
  richText: `
		<article>
			<header>
				<h1>Existem taxas adicionais?</h1>
			</header>
			<section>
				<p>Nós geralmente enviamos com o seu correio local. Não deve haver nenhuma taxa adicional ao usar o correio normal. Se houver quaisquer taxas ou impostos devidos a inspeções alfandegárias ou quaisquer outras taxas cobradas por você, por favor, mantenha o recibo do pagamento e entre em contato com o atendimento ao cliente ${window.sitename} enviando um ingresso.
				</p>
			</section>
		</article>
	`
}
const question55 = {
  id: 'se-55',
  title: 'Por que eu não recebi meu pedido?',
  parentId: 'root-5',
  richText: `
		<article>
			<header>
				<h1>Por que eu não recebi meu pedido?</h1>
			</header>
			<section>
				<p>
					Para cada método de envio, precisamos de 3-7 dias úteis para preparar o pedido.
A remessa leva de 3 a 25 dias úteis para chegar aos países de destino.
				</p>
				<p>Por favor note: Tempo Total de Entrega = Tempo de Processamento + Tempo de Envio</p>
				<p>Para a data de chegada prevista, consulte <a href="https://www.${window.sitename}.com/fs/shipping-policy?isouter=1">http://www.${window.sitename}.com/fs/shipping-policy-pc</a></p>
			</section>
		</article>
	`
}
const question56 = {
  id: 'se-56',
  title: 'Meu pedido não pode ser entregue, o que posso fazer?',
  parentId: 'root-5',
  richText: `
		<article>
			<header>
				<h1>Meu pedido não pode ser entregue, o que posso fazer?</h1>
			</header>
			<section>
				<p>
					Por favor, entre em contato com o correio local ou com o serviço de entrega diretamente com o seu número de rastreamento. Se ainda não conseguir encontrar o seu pacote, não hesite em entrar em contato com o Atendimento ao Cliente da ${window.sitename}.
				</p>
			</section>
		</article>
	`
}
const question57 = {
  id: 'se-57',
  title: 'Eu tenho que pagar pelas fantasias, o que posso fazer?',
  parentId: 'root-5',
  richText: `
		<article>
			<header>
				<h1>Eu tenho que pagar pelas fantasias, o que posso fazer?</h1>
			</header>
			<section>
				<p>
					Se você é cobrado de tarifas, por favor envie-nos uma foto do recibo, e nós lhe ofereceremos uma compensação apropriada.
				</p>
			</section>
		</article>
	`
}
const question58 = {
  id: 'se-58',
  title: 'Por quanto tempo meu pedido chegará?',
  parentId: 'root-5',
  richText: `
		<article>
			<header>
				<h1>Por quanto tempo meu pedido chegará?</h1>
			</header>
			<section>
				<p>
					Para cada método de envio, precisamos de 3-7 dias úteis para preparar o pedido.
A remessa leva de 3 a 25 dias úteis para chegar aos países de destino.
				</p>
				<p>Por favor note: Tempo Total de Entrega = Tempo de Processamento + Tempo de Envio</p>
				<p>Para a data de chegada prevista, consulte  <a href="https://www.${window.sitename}.com/fs/shipping-policy?isouter=1">http://www.${window.sitename}.com/fs/shipping-policy-pc</a></p>
			</section>
		</article>
	`
}
const question59 = {
  id: 'se-59',
  title: 'Quanto tempo eu preciso esperar para que meu pedido chegue?',
  parentId: 'root-5',
  richText: `
		<article>
			<header>
				<h1>Quanto tempo eu preciso esperar para que meu pedido chegue?</h1>
			</header>
			<section>
				<p>
					Para cada método de envio, precisamos de 3-7 dias úteis para preparar o pedido.
A remessa leva de 3 a 25 dias úteis para chegar aos países de destino.
				</p>
				<p>Por favor note: Tempo Total de Entrega = Tempo de Processamento + Tempo de Envio</p>
				<p>Para a data de chegada prevista, consulte<a href="https://www.${window.sitename}.com/fs/shipping-policy?isouter=1">http://www.${window.sitename}.com/fs/shipping-policy-pc</a></p>
			</section>
		</article>
	`
}
const question60 = {
  id: 'se-60',
  title: 'Você tem entrega em 2 dias?',
  parentId: 'root-5',
  richText: `
		<article>
			<header>
				<h1>Você tem entrega em 2 dias?</h1>
			</header>
			<section>
			    <p>Desculpe, não temos envio de 2 dias.</p>
				<p>
					Para cada método de envio, precisamos de 3-7 dias úteis para preparar o pedido.
A remessa leva de 3 a 25 dias úteis para chegar aos países de destino.
				</p>
				<p>Por favor note: Tempo Total de Entrega = Tempo de Processamento + Tempo de Envio</p>
				<p>Para a data de chegada prevista, consulte  <a href="https://www.${window.sitename}.com/fs/shipping-policy?isouter=1">http://www.${window.sitename}.com/fs/shipping-policy-pc</a></p>
			</section>
		</article>
	`
}
const question61 = {
  id: 'se-61',
  title: 'Qual é a sua política de devolução?',
  parentId: 'root-6',
  richText: `
		<article>
			<header>
				<h1>Qual é a sua política de devolução?</h1>
			</header>
			<section>
				<p>
					Nossa Política de Devolução é a seguinte:
				</p>
				<p>
					Você pode devolver todos os produtos dentro de 30 dias (a partir da data de recebimento dos itens) da entrega para troca ou reembolso. A embalagem original e a etiqueta devem estar intactas, não danificadas.
				</p>
				<p>
					Para o (s) item (ns) devolvido (s), nós providenciaremos uma substituição ou emitiremos um reembolso após termos verificado o seu número de rastreamento de retorno ou recibo.
				</p>
				<p>
					Por favor, note que os seguintes itens não podem ser devolvidos ou trocados: fato de banho, lingerie, fatos de banho, roupa de banho, jóias e acessórios.
				</p>
				<p>
					Nós não aceitamos itens devolvidos que foram enviados de volta por você diretamente, sem verificar conosco primeiro.
				</p>
				<p>
					Por favor, não faça retornos diretamente para o endereço no pacote recebido.Only enviar para o endereço que o nosso serviço ao cliente fornecido.
				</p>
				<p>
					Se você deseja devolver os itens para o endereço de retorno mais próximo, entre em contato conosco e nosso serviço ao cliente irá responder-lhe no prazo de 24 horas.
				</p>
				<p>
					Os reembolsos serão devolvidos para a forma original de pagamento usada para fazer seu pedido. Por favor, aguarde 24 horas com Paypal e 7-15 dias úteis com cartão de crédito para que seu reembolso apareça.
				</p>
				<p>
					A taxa de envio original e o seguro não são reembolsáveis.
				</p>
				<p>Não oferecemos serviço de frete para coleta (FTC) para os pacotes devolvidos para nós. Os retornos serão feitos a seu próprio custo. a menos que um erro seja cometido por ${window.sitename}.</p>
			</section>
		</article>
	`
}
const question62 = {
  id: 'se-62',
  title: 'Eu ainda não recebi o reembolso no cartão. Qual é o status do meu reembolso?',
  parentId: 'root-6',
  richText: `
		<article>
			<header>
				<h1>Eu ainda não recebi o reembolso no cartão. Qual é o status do meu reembolso?</h1>
			</header>
			<section>
				<p>
					O reembolso é devolvido ao seu pagamento original:
				</p>
				<p>Se você pagou pelo PayPal, o reembolso chegará à sua conta do PayPal dentro de um a dois dias úteis; Se você pagou com cartão de crédito, levará de 7 a 15 dias úteis para que o processo de reembolso seja feito pelo banco do cartão. Por favor, tenha em atenção que não podemos controlar a velocidade do seu banco de cartões.</p>
			    <p>A ${window.sitename} não consegue controlar a velocidade de processamento do seu banco de cartões. Por favor, pergunte ao banco do cartão para informações detalhadas</p>
			    <p>Pedimos desculpas genuinamente pelo inconveniente causado</p>
			</section>
		</article>
	`
}
const question63 = {
  id: 'se-63',
  title: 'Quanto tempo demora para o meu reembolso ser processado?',
  parentId: 'root-6',
  richText: `
		<article>
			<header>
				<h1>Quanto tempo demora para o meu reembolso ser processado?</h1>
			</header>
			<section>
				<p>
					O reembolso é devolvido ao seu pagamento original:
				</p>
				<p>Se você pagou pelo PayPal, o reembolso chegará à sua conta do PayPal dentro de um a dois dias úteis; Se você pagou com cartão de crédito, levará de 7 a 15 dias úteis para que o processo de reembolso seja feito pelo banco do cartão. Por favor, tenha em atenção que não podemos controlar a velocidade do seu banco de cartões.</p>
			</section>
		</article>
	`
}

const question64 = {
  id: 'se-64',
  title: 'Como faço para devolver meu pedido?',
  parentId: 'root-6',
  richText: `
		<article>
			<header>
				<h1>Como faço para devolver meu pedido?</h1>
			</header>
			<section>
				<p>
					Certifique-se de que nossa equipe tenha trabalhado com você antes de devolver o pacote. O endereço na encomenda não é o nosso endereço de armazém e a nossa equipa enviará o endereço de retorno em conformidade
				</p>
				<p>Você pode começar o seu retorno enviando um ticket de suporte ou e-mail para a nossa equipe de pós-venda com o seu motivo de retorno, nossa equipe irá enviar-lhe o endereço de retorno</p>
			</section>
		</article>
	`
}
const question65 = {
  id: 'se-65',
  title: 'Receberei reembolso total pelo meu retorno?',
  parentId: 'root-6',
  richText: `
		<article>
			<header>
				<h1>Receberei reembolso total pelo meu retorno?</h1>
			</header>
			<section>
				<p>
					Vamos oferecer um reembolso total em todos os itens que você retornou (exclui taxa de envio e itens não retornados).
				</p>
			</section>
		</article>
	`
}
const question66 = {
  id: 'se-66',
  title: 'Qual é o status do meu retorno ou troca?',
  parentId: 'root-6',
  richText: `
		<article>
			<header>
				<h1>Qual é o status do meu retorno ou troca?</h1>
			</header>
			<section>
				<p>
					Certifique-se de que nossa equipe tenha trabalhado com você antes de devolver o pacote. 
				</p>
				<p>
				Você pode iniciar o seu retorno enviando um ticket de suporte com o seu retorno. Uma vez que seu retorno / troca tenha sido processado, nós responderemos a você.
                </p>
			</section>
		</article>
	`
}
const question67 = {
  id: 'se-67',
  title: 'Quais itens não podem ser devolvidos ou reembolsados?',
  parentId: 'root-6',
  richText: `
		<article>
			<header>
				<h1>Quais itens não podem ser devolvidos ou reembolsados?</h1>
			</header>
			<section>
				<p>
					Não aceitamos devoluções / trocas para os seguintes itens, devido a razões de higiene: roupa de banho, lingerie, trajes de banho, roupas de banho, jóias e acessórios.
				</p>
			</section>
		</article>
	`
}
const question68 = {
  id: 'se-68',
  title: 'E se eu recebesse um item com defeito?',
  parentId: 'root-6',
  richText: `
		<article>
			<header>
				<h1>E se eu recebesse um item com defeito?</h1>
			</header>
			<section>
				<p>
					Se você recebeu um item com defeito, faça o login na sua conta ${window.sitename} e envie um ticket dentro de 30 dias da entrega. Ao enviar o ticket, forneça uma descrição do item com defeito e algumas fotos. Por favor, certifique-se de enviar um ticket antes de devolver qualquer coisa para que possamos resolver o problema para você.
				</p>
			</section>
		</article>
	`
}
const question69 = {
  id: 'se-69',
  title: ' se eu recebesse um item defeituoso / errado / manchado?',
  parentId: 'root-6',
  richText: `
		<article>
			<header>
				<h1> se eu recebesse um item defeituoso / errado / manchado?</h1>
			</header>
			<section>
				<p>
					Se você recebeu um item defeituoso manchado ou um item que você não pediu, entre em contato com o Suporte ao Cliente enviando um ticket dentro de 30 dias da entrega. Por favor, certifique-se de enviar um ticket antes de devolver qualquer coisa para que possamos resolver o problema para você, Ao enviar o ticket, forneça uma descrição do item, número do SKU e algumas fotos.
				</p>
			</section>
		</article>
	`
}
const question70 = {
  id: 'se-70',
  title: 'Existe um rótulo gratuito para devolução do pedido?',
  parentId: 'root-6',
  richText: `
		<article>
			<header>
				<h1>Existe um rótulo gratuito para devolução do pedido?</h1>
			</header>
			<section>
				<p>
					Não temos uma etiqueta de devolução gratuita para devolver o pedido
				</p>
				<p>Certifique-se de que nossa equipe tenha trabalhado com você antes de devolver o pacote. O endereço na encomenda não é o nosso endereço de armazém e a nossa equipa enviará o endereço de retorno em conformidade.</p>
				<p>Você pode começar o seu retorno, enviando um ticket de suporte com o seu motivo de retorno, nossa equipe irá enviar-lhe o endereço de retorno</p>
			</section>
		</article>
	`
}
const question71 = {
  id: 'se-71',
  title: 'Como faço para retornar um item que não se encaixa?',
  parentId: 'root-6',
  richText: `
		<article>
			<header>
				<h1>Como faço para retornar um item que não se encaixa?</h1>
			</header>
			<section>
				<p>
					Certifique-se de que nossa equipe tenha trabalhado com você antes de devolver o pacote.
				</p>
				<p>O endereço na encomenda não é o nosso endereço de armazém e a nossa equipa enviará o endereço de retorno em conformidade.</p>
			    <p>Você pode começar o seu retorno, enviando um ticket de suporte ou e-mail para o nosso satff pós-venda com o seu motivo de retorno, nossa equipe irá enviar-lhe o endereço de retorno</p>
			</section>
		</article>
	`
}
const question72 = {
  id: 'se-72',
  title: 'Ainda não recebi meu reembolso, o que há de errado?',
  parentId: 'root-6',
  richText: `
		<article>
			<header>
				<h1>Ainda não recebi meu reembolso, o que há de errado?</h1>
			</header>
			<section>
				<p>
					reembolso é devolvido de volta ao seu pagamento original:
				</p>
				<p>Se você pagou pelo PayPal, o reembolso chegará à sua conta do PayPal dentro de um a dois dias úteis; Se você pagou com cartão de crédito, levará de 7 a 15 dias úteis para que o processo de reembolso seja feito pelo banco do cartão. Por favor, tenha em atenção que não podemos controlar a velocidade do seu banco de cartões.</p>
				<p>A ${window.sitename} não consegue controlar a velocidade de processamento do seu banco de cartões. Por favor, pergunte ao banco do cartão para informações detalhadas.</p>
			    <p>Pedimos desculpas genuinamente pelo inconveniente causado</p>
			</section>
		</article>
	`
}
const question73 = {
  id: 'se-73',
  title: 'Como posso devolver um item para uma troca?',
  parentId: 'root-6',
  richText: `
		<article>
			<header>
				<h1>Como posso devolver um item para uma troca?</h1>
			</header>
			<section>
				<p>
					Certifique-se de que nossa equipe tenha trabalhado com você antes de devolver o pacote. O endereço na encomenda não é o nosso endereço de armazém e a nossa equipa enviará o endereço de retorno em conformidade.
				</p>
				<p>Você pode começar o seu retorno, enviando um ticket de suporte ou e-mail para o nosso satff pós-venda com o seu motivo de retorno, nossa equipe irá enviar-lhe o endereço de retorno</p>
			</section>
		</article>
	`
}
const question74 = {
  id: 'se-74',
  title: 'Qual é o status do meu reembolso?',
  parentId: 'root-6',
  richText: `
		<article>
			<header>
				<h1>Qual é o status do meu reembolso?</h1>
			</header>
			<section>
				<p>
					reembolso é devolvido de volta ao seu pagamento original:
				</p>
				<p>Se você pagou pelo PayPal, o reembolso chegará à sua conta do PayPal dentro de um a dois dias úteis; Se você pagou com cartão de crédito, levará de 7 a 15 dias úteis para que o processo de reembolso seja feito pelo banco do cartão. Por favor, tenha em atenção que não podemos controlar a velocidade do seu banco de cartões.</p>
				<p>A ${window.sitename} não consegue controlar a velocidade de processamento do seu banco de cartões. Por favor, pergunte ao banco do cartão para informações detalhadas.</p>
			    <p>Pedimos desculpas genuinamente pelo inconveniente causado</p>
			</section>
		</article>
	`
}
const question75 = {
  id: 'se-75',
  title: 'Preciso pagar a taxa de envio se eu devolver os itens?',
  parentId: 'root-6',
  richText: `
		<article>
			<header>
				<h1>Preciso pagar a taxa de envio se eu devolver os itens?</h1>
			</header>
			<section>
				<p>
					Não oferecemos serviço de frete para coleta (FTC) para os pacotes devolvidos para nós. Os retornos serão feitos a seu próprio custo. a menos que um erro seja cometido por ${window.sitename}.
				</p>
			</section>
		</article>
	`
}
const question76 = {
  id: 'se-76',
  title: 'O que posso fazer se o item não couber em mim?',
  parentId: 'root-6',
  richText: `
		<article>
			<header>
				<h1>O que posso fazer se o item não couber em mim?</h1>
			</header>
			<section>
				<p>
					Se não couber, você pode enviar um tíquete de suporte ou e-mail para nossa equipe de pós-vendas, e nossa equipe resolverá o problema para você.
				</p>
			</section>
		</article>
	`
}
const question77 = {
  id: 'se-77',
  title: 'O que posso fazer se o item estiver danificado?',
  parentId: 'root-6',
  richText: `
		<article>
			<header>
				<h1>O que posso fazer se o item estiver danificado?</h1>
			</header>
			<section>
				<p>
					Você pode enviar algumas fotos da etiqueta na embalagem errada que você recebeu e fotos da deserção como referência. O SKU do item também é necessário. Nossa equipe de atendimento ao cliente tentará melhor resolver seu problema.
				</p>
				<p>
				Se você devolver os itens sem confirmar com o nosso serviço ao cliente primeiro, nossa equipe pode não ser capaz de aceitar os itens devolvidos e a solicitação de reembolso também não será processada.
                </p>
			</section>
		</article>
	`
}
const question78 = {
  id: 'se-78',
  title: 'Will '+ window.sitename +' salva minhas informações pessoais?',
  parentId: 'root-7',
  richText: `
		<article>
			<header>
				<h1>Will ${window.sitename} salva minhas informações pessoais?</h1>
			</header>
			<section>
				<p>
					Nós respeitamos sua privacidade e mantemos suas informações pessoais confidenciais.
				</p>
				<p>Nós respeitamos sua privacidade e mantemos suas informações pessoais confidenciais.
Quando você visita nosso site, as informações coletadas são armazenadas pelo seu navegador, como seu nome, número de telefone, código postal e endereço. Os cookies podem ser usados ​​para reconhecer seu endereço IP e fornecer acesso mais rápido ao nosso site. Você pode restringir o uso de cookies alterando as configurações no seu navegador.</p>
			    <p>Observe que isso limitará seu acesso ao nosso site.</p>
			</section>
		</article>
	`
}
const question79 = {
  id: 'se-79',
  title: 'É seguro encomendar aqui?',
  parentId: 'root-7',
  richText: `
		<article>
			<header>
				<h1>É seguro encomendar aqui?</h1>
			</header>
			<section>
				<p>
					A ${window.sitename} foi fundada por pessoas com quase 10 anos no setor de comércio eletrônico. Levamos a sua empresa a sério e, acima de tudo, queremos que os nossos clientes sejam felizes. Aceitamos vários dos métodos de pagamento on-line mais confiáveis ​​disponíveis hoje.
                </p>
			</section>
		</article>
	`
}
const question80 = {
  id: 'se-80',
  title: 'Como posso cancelar a assinatura do '+ window.sitename +'?',
  parentId: 'root-7',
  richText: `
		<article>
			<header>
				<h1>Como posso cancelar a assinatura do ${window.sitename}?</h1>
			</header>
			<section>
				<p>
					Se você não quiser acompanhar os nossos últimos itens e promoções, pode cancelar a inscrição simplesmente clicando no link de cancelamento na parte inferior de todos os e-mails que enviamos e seguindo as instruções.
				</p>
			</section>
		</article>
	`
}
const question81 = {
  id: 'se-81',
  title: 'Sobre nós ',
  parentId: 'root-8',
  richText: `
		<article>
			<header>
				<h1>Sobre nós </h1>
			</header>
			<section>
				<p>
					${window.sitename} é um site exclusivo de compras com um tom distinto focado na moda feminina. Oferecemos produtos de alto desempenho, incluindo roupas femininas, jóias, produtos de beleza e saúde, calçados, bolsas e muito mais. Nossa visão é trazer felicidade para a vida de toda mulher.
				</p>
				<p>Características do ${window.sitename} incluem, mas não estão limitadas a:</p>
				<ul>
				    <li>Mais de 100.000 estilos de produtos e mais de 500 estilos diários de atualização.Coletamos informações sobre moda feminina e fornecemos produtos relevantes o mais rápido</li>
                    <li>o preços 50-80% mais barato do que local,Nós cooperamos com muitos fabricantes, em vez de terceirizar de intermediáriosNós compramos em escala, então o preço é menor do que o preço de mercado</li>
                    <li>o recomendações de produtos,Recomendamos produtos populares para os quais você pode não estar ciente</li>
                    <li>oA capacidade de compartilhar seu estilo com os amigos,Poste e compartilhe seu estilo para contar aos seus amigos como você é legal</li>
                    <li>o pagamento seguro via PayPal ou cartão de crédito Cupons de inscrição e atividades temáticas</li>
                </ul>
			</section>
		</article>
	`
}
const question82 = {
  id: 'se-82',
  title: 'Onde encontrar '+ window.sitename +'?',
  parentId: 'root-8',
  richText: `
		<article>
			<header>
				<h1>Onde encontrar ${window.sitename}?</h1>
			</header>
			<section>
				<p>
					Como uma loja online, você pode encontrar ${window.sitename} onde quer que você possa ter acesso à internet.
				</p>
				<p>Estamos enviando agora para a maioria dos países do mundo com websites de apoio, Estados Unidos, Espanha, França, Rússia, Alemanha, Itália, Austrália e Oriente Médio.</p>
				<p>Se você quer saber o que há de novo no ${window.sitename}, simplesmente fique conectado conosco através do nosso Facebook, Instagram, Youtube, Pinterest, Tumblr!</p>
			</section>
		</article>
	`
}
const question83 = {
  id: 'se-83',
  title: 'Por que eu sou chique?',
  parentId: 'root-8',
  richText: `
		<article>
			<header>
				<h1>Por que eu sou chique?</h1>
			</header>
			<section>
				<ul>
				    <li> preços competitivos; </ li>
                    <li> estilos de moda mais recentes; </ li>
                    <li> Frete grátis e política de devolução; </ li>
                    <li> Atendimento ao cliente excepcional. </ li>
                </ul>
                <p>
Se você se inscreveu no ${window.sitename} usando seu ID do Facebook, você pode desativar os privilégios de ${window.sitename} no Facebook usando seu computador ou dispositivo móvel.</p>
			    <p>No seu computador, visite <a href="http://facebook.com/settings/?tab=applications">http://facebook.com/settings/?tab=applications</a>.selecione o "X" no ícone do ${window.sitename}.</p>
			    <p>Em seu aplicativo do Facebook, basta escolher "Configurações da conta" no menu. Em seguida, escolha "Aplicativos" -> "${window.sitename}" -> "Remover ${window.sitename}".</p>
			    <p>Infelizmente, não há nenhuma opção atualmente disponível para usuários baseados em email que gostariam de excluir sua conta ${window.sitename}.</p>
			</section>
		</article>
	`
}
const question84 = {
  id: 'se-84',
  title: ' site é real?',
  parentId: 'root-8',
  richText: `
		<article>
			<header>
				<h1> site é real?</h1>
			</header>
			<section>
				<p>
					Sim, é real.${window.sitename} foi fundada por pessoas com quase 10 anos no setor de comércio eletrônico. Aceitamos vários dos métodos de pagamento on-line mais confiáveis ​​disponíveis hoje.
				</p>
			</section>
		</article>
	`
}
const question85 = {
  id: 'se-85',
  title: 'Isso salvará as informações do meu cartão?',
  parentId: 'root-8',
  richText: `
		<article>
			<header>
				<h1>Isso salvará as informações do meu cartão?</h1>
			</header>
			<section>
				<p>
					Respeitamos sua privacidade e mantemos suas informações pessoais confidenciais. E não salvamos as informações de seu cartão, não se preocupe
				</p>
			</section>
		</article>
	`
}
const question86 = {
  id: 'se-86',
  title: 'Onde posso encontrar o item que salvei?',
  parentId: 'root-8',
  richText: `
		<article>
			<header>
				<h1>Onde posso encontrar o item que salvei?</h1>
			</header>
			<section>
				<p>
					Olá, você pode encontrá-lo em sua lista de desejos, por favor entre primeiro, depois encontre-o na seção Eu
				</p>
			</section>
		</article>
	`
}
const question87 = {
  id: 'se-87',
  title: '.Por quanto tempo receberei os 30 créditos depois que os produtos forem compartilhados?',
  parentId: 'root-8',
  richText: `
		<article>
			<header>
				<h1>Por quanto tempo receberei os 30 créditos depois que os produtos forem compartilhados?</h1>
			</header>
			<section>
				<p>
					Olá, depois que foi compartilhado, ele precisa de 1-2 dias de businees para enviar o credtis ao seu registro de e-mail registrado.
				</p>
			</section>
		</article>
	`
}
const question88 = {
  id: 'se-88',
  title: 'Qual é a sua política de envio?',
  parentId: 'root-8',
  richText: `
		<article>
			<header>
				<h1>Qual é a sua política de envio?</h1>
			</header>
			<section>
				<p>
					Olá, para cada método de envio, precisamos de 3-7 dias úteis para preparar o pedido.
				</p>
				<p>A remessa leva de 3 a 25 dias úteis para chegar aos países de destino.</p>
				<p>Por favor note: Tempo Total de Entrega = Tempo de Processamento + Tempo de Envio</p>
				<p>Para a data de chegada prevista, consulte <a href="https://www.${window.sitename}.com/fs/shipping-policy?isouter=1">http://www.${window.sitename}.com/fs/shipping-policy-pc</a></p>
			</section>
		</article>
	`
}
const question89 = {
  id: 'se-89',
  title: 'Você faz atacado?',
  parentId: 'root-8',
  richText: `
		<article>
			<header>
				<h1>Você faz atacado?</h1>
			</header>
			<section>
				<p>
					Olá, nós temos a política de atacado: http: //www.${window.sitename}.com/fs/wholesale-program-pc você pode dar uma olhada
				</p>
			</section>
		</article>
	`
}
const question90 = {
  id: 'se-90',
  title: 'Como posso cooperar com você?',
  parentId: 'root-8',
  richText: `
		<article>
			<header>
				<h1>Como posso cooperar com você?</h1>
			</header>
			<section>
				<p>
					Olá, se você quiser colaborar conosco, entre em contato com este e-mail: affiliates@${window.sitename}.com Nosso colega responderá por você.
				</p>
			</section>
		</article>
	`
}
const question91 = {
  id: 'se-91',
  title: 'Como posso escolher o método de envio?',
  parentId: 'root-8',
  richText: `
		<article>
			<header>
				<h1>Como posso escolher o método de envio?</h1>
			</header>
			<section>
				<p>
					Olá, Depois de adicionar o endereço de entrega, você pode escolher o método de envio desejado antes de sair
				</p>
			</section>
		</article>
	`
}
const question92 = {
  id: 'se-92',
  title: 'Você tem lojas?',
  parentId: 'root-8',
  richText: `
		<article>
			<header>
				<h1>Você tem lojas?</h1>
			</header>
			<section>
				<p>
					Olá, apenas fazemos compras on-line, não temos loja física
				</p>
			</section>
		</article>
	`
}
const question93 = {
  id: 'se-93',
  title: 'Você pode enviar para APO?',
  parentId: 'root-8',
  richText: `
		<article>
			<header>
				<h1>Você pode enviar para APO?</h1>
			</header>
			<section>
				<p>
					Olá, nós podemos enviar para a APO, mas só pode ser enviado pelo envio padrão
				</p>
			</section>
		</article>
	`
}
const question94 = {
  id: 'se-94',
  title: 'Como posso mudar a moeda?',
  parentId: 'root-8',
  richText: `
		<article>
			<header>
				<h1>Como posso mudar a moeda?</h1>
			</header>
			<section>
				<p>
					Olá, você pode entrar no nosso site primeiro, então você pode alterá-lo na configuração
				</p>
			</section>
		</article>
	`
}

const secondaries = [
  question1,
  question2,
  question3,
  question4,
  question5,
  question6,
  question7,
  question8,
  question9,
  question10,
  question11,
  question12,
  question13,
  question14,
  question15,
  question16,
  question17,
  question18,
  question19,
  question20,
  question21,
  question22,
  question23,
  question24,
  question25,
  question26,
  question27,
  question28,
  question29,
  question30,
  question31,
  question32,
  question33,
  question34,
  question35,
  question36,
  question37,
  question38,
  question39,
  question40,
  question41,
  question42,
  question43,
  question44,
  question45,
  question46,
  question47,
  question48,
  question49,
  question50,
  question51,
  question52,
  question53,
  question54,
  question55,
  question56,
  question57,
  question58,
  question59,
  question60,
  question61,
  question62,
  question63,
  question64,
  question65,
  question66,
  question67,
  question68,
  question69,
  question70,
  question71,
  question72,
  question73,
  question74,
  question75,
  question76,
  question77,
  question78,
  question79,
  question80,
  question81,
  question82,
  question83,
  question84,
  question85,
  question86,
  question87,
  question88,
  question89,
  question90,
  question91,
  question92,
  question93,
  question94

]

const questions = [
  {
    id: 'root-1',
    title: 'Conta',
    questions: [
      question1,
      question2,
      question3,
      question4,
      question5,
      question6,
      question7
    ]
  },
  {
    id: 'root-2',
    title: 'Encomendas',
    questions: [
      question8,
      question9,
      question10,
      question11,
      question12,
      question13,
      question14,
      question15,
      question16,
      question17,
      question18,
      question19,
      question20
    ]
  },
  {
    id: 'root-3',
    title: 'Forma de pagamento',
    questions: [
      question21,
      question22,
      question23,
      question24,
      question25,
      question26,
      question27,
      question28,
      question29,
      question30,
      question31,
      question32
    ]
  },
  {
    id: 'root-4',
    title: 'Produtos',
    questions: [
      question33,
      question34,
      question35,
      question36,
      question37,
      question38,
      question39,
      question40,
      question41,
      question42
    ]
  },
  {
    id: 'root-5',
    title: 'Entrega',
    questions: [
      question43,
      question44,
      question45,
      question46,
      question47,
      question48,
      question49,
      question50,
      question51,
      question52,
      question53,
      question54,
      question55,
      question56,
      question57,
      question58,
      question59,
      question60
    ]
  },
  {
    id: 'root-6',
    title: 'Retorna',
    questions: [
      question61,
      question62,
      question63,
      question64,
      question65,
      question66,
      question67,
      question68,
      question69,
      question70,
      question71,
      question72,
      question73,
      question74,
      question75,
      question76,
      question77
    ]
  },
  {
    id: 'root-7',
    title: 'Segurança e privacidade',
    questions: [
      question78,
      question79,
      question80
    ]
  },
  {
    id: 'root-8',
    title: 'Sobre '+ window.sitename +'',
    questions: [
      question81,
      question82,
      question83,
      question84,
      question85,
      question86,
      question87,
      question88,
      question89,
      question90,
      question91,
      question92,
      question93,
      question94
    ]
  }
]

export default {
  questions,
  secondaries
}
