export default function ContactForm() {
  return (
    <>
      {/* TODO: Connect this form to Formspree or Cloudflare Pages Functions before enabling submissions. */}
      <form
        className="contact-form"
        aria-label="Contact form"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <label>
          <span>Name</span>
          <input name="name" autoComplete="name" type="text" />
        </label>
        <label>
          <span>Email</span>
          <input name="email" autoComplete="email" type="email" />
        </label>
        <label>
          <span>Topic</span>
          <input name="topic" type="text" />
        </label>
        <label>
          <span>Message</span>
          <textarea name="message" rows="5" />
        </label>
        <button type="submit">Send Message</button>
      </form>
    </>
  );
}
