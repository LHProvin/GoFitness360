# GoFitness360

## Introdução
GoFitness360 é uma plataforma inovadora que facilita a busca e o gerenciamento de locais para a prática de atividades físicas, permitindo aos usuários acessar informações detalhadas sobre diversos pontos de exercícios e registrar suas próprias contribuições.

### Problema que Resolve
A dificuldade de encontrar locais adequados para a prática de exercícios físicos é um desafio comum para muitas pessoas. GoFitness360 resolve este problema ao fornecer uma plataforma centralizada onde os usuários podem descobrir locais de exercícios próximos, aprender sobre os tipos de atividades disponíveis e contribuir com informações para a comunidade.

## Tecnologias Utilizadas
GoFitness360 foi desenvolvido utilizando uma variedade de tecnologias e bibliotecas modernas, garantindo uma experiência de usuário fluida e responsiva:

- **React**: Usado para construir a interface do usuário com componentes reativos e eficientes.
- **React Router**: Gerenciamento de navegação entre páginas da aplicação.
- **Material-UI**: Framework UI para React que fornece componentes de interface pré-construídos e customizáveis.
- **Axios**: Cliente HTTP baseado em Promises para fazer requisições à API do ViaCEP e obter dados de endereços.
- **JSON Server**: Utilizado para simular uma API RESTful com operações CRUD, facilitando o desenvolvimento e testes locais.

### Como Executar

#### Pré-requisitos
Antes de iniciar, é necessário ter o Node.js e o npm (ou yarn) instalados em sua máquina.

#### Instalação
1. Clone o repositório do projeto:
   ```bash
   git clone https://github.com/seu-usuario/exercita365.git
   cd exercita365
   npm install
   json-server --watch db.json 
   npm start
   Acesse http://localhost:3000 em seu navegador para usar a aplicação.

#### Melhorias Futuras
1 - Autenticação de Usuários: Implementar autenticação completa para segurança dos dados dos usuários.
2 - Integração com APIs de Clima: Oferecer informações sobre o clima nos locais de exercícios para melhor      planejamento das atividades.
3 - Funcionalidades de Socialização: Adicionar recursos que permitam aos usuários formarem grupos e marcarem encontros nos locais de exercícios.


#### Conclusão
GoFitness360 é uma ferramenta essencial para quem busca manter um estilo de vida ativo com facilidade e conveniência. Através de sua interface amigável e recursos robustos, a plataforma serve a uma comunidade crescente de entusiastas de fitness que valorizam a acessibilidade e a informação.