import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
    <SignIn
      appearance={{
        variables: {
          colorPrimary: "var(--clr-primary)",
          colorText: "var(--clr-text)",
          colorBackground: "var(--clr-bg)",
          borderRadius: "10px",
          fontFamily: "Inter, system-ui, sans-serif",
        },
      }}

      

      fallbackRedirectUrl="/"
    />
    </div>
  );
}
