const Form = ({
  outside,
  inside,
  onSubmit,
  children
} : {
  outside: string,
  inside: string,
  onSubmit: React.FormEventHandler<HTMLFormElement>
  children: React.ReactNode
}) => {
  return (
    <div className={outside}>
      <div className={inside}>
        <form onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    </div>
  );
};

export default Form;
