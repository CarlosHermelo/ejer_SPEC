function EmptyState({ title, message }) {
  return (
    <div className="state-box state-box-empty" role="status">
      <strong>{title}</strong>
      <p>{message}</p>
    </div>
  );
}

export default EmptyState;
