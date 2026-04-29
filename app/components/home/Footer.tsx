export function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__disclaimer">
        <p>
          <strong>Disclaimer:</strong> This is an independent tool using publicly available NBR
          data. We are not affiliated with the National Board of Revenue or any government body.
          Always verify your audit status directly with NBR or your tax circle before taking any
          action.
        </p>
        <p className="footer__official">
          Official source:{' '}
          <a href="https://nbr.gov.bd" target="_blank" rel="noopener noreferrer">
            nbr.gov.bd
          </a>
        </p>
      </div>

      <div className="footer__credit">
        Developed by{' '}
        <strong>
          <a href="https://niranyousuf.me" target="_blank" rel="noopener noreferrer">
            Niran Yousuf
          </a>
        </strong>
      </div>
    </footer>
  );
}
