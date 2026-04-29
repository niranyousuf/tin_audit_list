export type ResultState = 'idle' | 'found' | 'not-found' | 'invalid' | 'loading';

export type TinRecord = {
  tin: string;
  zone: string;
  circle: string;
  submissionType: string;
};
