import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.logoSection}>
        <section>WIP LOGO</section>
        <section>company details</section>
      </div>
      <div className={styles.infoSection}>
        <section>
          <i>icon</i>
          <p>address</p>
        </section>
        <section>
          <i>icon</i>
          <p>phone</p>
        </section>
        <section>
          <i>icon</i>
          <p>email</p>
        </section>
      </div>
      <div className={styles.aboutSection}>
        <section>
          <p>about</p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis autem iusto
            suscipit culpa laudantium repellendus incidunt accusantium adipisci aperiam odio?
          </p>
          <div>
            <i>facebook</i>
            <i>instagram</i>
            <i>linkedin</i>
            <i>github</i>
          </div>
        </section>
      </div>
    </footer>
  );
}

export default Footer;
