import css from './ErrorMessage.module.css';
import error from '../../img/oops.png';

const ErrorMessage = () => {
  return (
    <div>
      <img
        className={css.errorMessage}
        src={error}
        alt="Bad request"
        width={574}
        height={600}
      />
      <p className={css.errorText}>
        Oops! It is like something went wrong. Please, reload your page or try
        again later
      </p>
    </div>
  );
};
export default ErrorMessage;
