import css from './Notifications.module.css';

const Notifications = ({ condition }) => {
  return (
    <>
      {condition.length === 0 ? (
        <p className={css.notification}>Nothing found. Try another request</p>
      ) : (
        <p className={css.notification}>That is all we have got for you</p>
      )}
    </>
  );
};

export default Notifications;
