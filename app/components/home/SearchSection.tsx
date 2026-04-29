import { ResultState, TinRecord } from './types';

type SearchSectionProps = {
  tin: string;
  result: ResultState;
  suggestions: TinRecord[];
  onTinChange: (value: string) => void;
  onSuggestionSelect: (record: TinRecord) => void;
};

export function SearchSection({
  tin,
  result,
  suggestions,
  onTinChange,
  onSuggestionSelect,
}: SearchSectionProps) {
  return (
    <section className="search" aria-label="TIN search">
      <label className="search__label" htmlFor="tin-input">
        Taxpayer Identification Number (TIN)
      </label>
      <input
        id="tin-input"
        className="search__input"
        type="text"
        inputMode="numeric"
        maxLength={12}
        placeholder="e.g. 123456789012"
        value={tin}
        aria-label="Enter your 12-digit TIN number"
        aria-describedby="tin-hint"
        aria-invalid={result === 'invalid'}
        onChange={(e) => onTinChange(e.target.value)}
      />

      {result === 'invalid' && (
        <p id="tin-hint" className="search__error" role="alert">
          Please enter a valid 12-digit TIN number.
        </p>
      )}

      {suggestions.length > 0 && (
        <div className="search__suggestions" aria-label="TIN suggestions">
          {suggestions.map((item) => (
            <button
              key={item.tin}
              type="button"
              className="search__suggestion"
              onClick={() => onSuggestionSelect(item)}
            >
              <strong>{item.tin}</strong>
              <span>{item.zone}</span>
              <span>{item.circle}</span>
              <span>{item.submissionType}</span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
