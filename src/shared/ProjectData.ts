// Export ProjectData interface
export default interface ProjectData {
  id: string;
  progress: string;
  image: string;

  // Proponents Info
  name: string;
  address: string;
  contact_no: string;

  // Project Info
  title: string;
  funds_needed: string;
  duration: string;
  department: string;
  adviser: string;

  // Project Detail
  introduction: string;
  background: string;
  methodology: string;
}