import { ResultState, TinRecord } from './types';

type ResultSectionProps = {
  result: ResultState;
  tin: string;
  match: TinRecord | null;
};

export function ResultSection({ result, tin, match }: ResultSectionProps) {
  if (result !== 'found' && result !== 'not-found') {
    return null;
  }

  return (
    <section
      className={`result result--${result === 'found' ? 'found' : 'not-found'}`}
      aria-live="polite"
      aria-atomic="true"
      role="status"
    >
      {result === 'found' ? (
        <>
          <span className="result__icon" aria-hidden="true">
            ✕
          </span>
          <div>
            <p className="result__title">Selected for Audit</p>
            <p className="result__desc">
              TIN <strong>{tin}</strong> appears on the NBR Risk-Based Audit Selection list for AY
              2023–24. Please consult your tax circle or a qualified tax advisor.
            </p>
            {match && (
              <p className="result__meta">
                Zone: <strong>{match.zone}</strong> | Circle: <strong>{match.circle}</strong> |
                {' '}Submission Type: <strong>{match.submissionType}</strong>
              </p>
            )}
          </div>
        </>
      ) : (
        <>
          <span className="result__icon" aria-hidden="true">
            ○
          </span>
          <div>
            <p className="result__title">Not Selected</p>
            <p className="result__desc">
              TIN <strong>{tin}</strong> was not found on the audit selection list for AY 2023–24.
              Always verify directly with NBR.
            </p>
          </div>
        </>
      )}
    </section>
  );
}
