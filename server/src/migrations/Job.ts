export interface Job {
  id: string;
  run(): Promise<boolean>;
}
