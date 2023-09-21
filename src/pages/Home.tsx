export default function Home() {
  return (
    <div className="container">
      <div className="header">
        <h1 className="title">
          Welcome to{" "}
          <span className="gradient-text-0">
            <a href="/" target="_blank" rel="noopener noreferrer">
              web3-mailchimp
            </a>
          </span>
        </h1>

        <p className="description">
          Get started by configuring your desired network in{" "}
          <code className="code">src/index.js</code>, then modify the{" "}
          <code className="code">src/App.js</code> file!
        </p>
      </div>

      <div className="grid">
        <a href="/email" className="card">
          <img
            src="/images/portal-preview.png"
            alt="Placeholder preview of starter"
          />
          <div className="card-text">
            <h2 className="gradient-text-1">Portal ➜</h2>
            <p>Email</p>
          </div>
        </a>

        <a href="/" className="card">
          <img
            src="/images/dashboard-preview.png"
            alt="Placeholder preview of starter"
          />
          <div className="card-text">
            <h2 className="gradient-text-2">Home</h2>
            <p>Home page</p>
          </div>
        </a>

        <a href="/about" className="card">
          <img
            src="/images/templates-preview.png"
            alt="Placeholder preview of templates"
          />
          <div className="card-text">
            <h2 className="gradient-text-3">About</h2>
            <p>About this application</p>
          </div>
        </a>
      </div>
    </div>
  );
}
