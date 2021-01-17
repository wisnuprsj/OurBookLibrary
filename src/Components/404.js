function NotFoundPage() {
  return (
    <div className="jumbotron">
      <h1 className="display-3">Page Not Found</h1>
      <p className="lead">Please contact your IT team support</p>
      <hr className="my-4" />
      <p className="lead">
        <a className="btn btn-primary btn-lg" href="/Home" role="button">
          Home
        </a>
      </p>
    </div>
  );
}

export default NotFoundPage;
