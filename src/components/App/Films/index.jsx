const Films = (props) => {
  const id = props.match.params.id;
  return <div>Films {id}</div>;
};

export default Films;
