export const jwtKey = "jwt";
export const endpoint =
  "https://learn.zone01dakar.sn/api/graphql-engine/v1/graphql";
export const signInEndpoint = "https://learn.zone01dakar.sn/api/auth/signin";

// export function initMode() {
//   // Supposons que vous ayez une case à cocher avec l'ID "myCheckbox"
  
// }

// Ajoutez un "event listener" pour l'événement "change"
export function checkBox() {
  const checkbox = document.getElementById("toggle-check");

  if (checkbox.checked) {
    localStorage.setItem("mode", "dark");
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
    localStorage.removeItem("mode");
  }
}
