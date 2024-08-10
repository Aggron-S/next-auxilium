const SideMenu = ({
  outside,
  inside,
  children
} : {
  outside: string,
  inside: string,
  children: React.ReactNode
}) => {
  return (
    <div className={outside}>
      <div className={inside}>
        {children}
      </div>
    </div>
  );
};

export default SideMenu;
