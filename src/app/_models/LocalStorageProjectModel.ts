export class LocalStorageProjectModel {
  projectId: string;
  projectTitle: string;
  projectCreationDate: string;
  key: string;
  
  constructor(id: string, title: string, creationDate: string, key: string) { 
    this.projectId = id;
    this.projectTitle = title;
    this.projectCreationDate = creationDate;
    this.key = key;
  }
}
