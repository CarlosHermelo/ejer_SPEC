function ErrorState({ title, message }) {
  return (
    <div className="state-box state-box-error" role="alert">
      <strong>{title}</strong>
      <p>{message}</p>
    </div>
  );
}

export default ErrorState;
