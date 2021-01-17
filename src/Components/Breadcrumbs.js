function Breadcrumbs(props) {
  return (
    <ol className="breadcrumb">
      <li className="breadcrumb-item active">{props.title}</li>
    </ol>
  );
}

export default Breadcrumbs;
