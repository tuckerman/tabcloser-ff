async function loadOptions() {
  const { protectedUrls } = await browser.storage.sync.get("protectedUrls");
  document.getElementById("protectedUrls").value = protectedUrls || "";
}

// Save protected URLs to storage
async function saveOptions() {
  const protectedUrls = document.getElementById("protectedUrls").value;
  await browser.storage.sync.set({ protectedUrls });
  alert("Options saved!");
}

document.getElementById("save").addEventListener("click", saveOptions);
document.addEventListener("DOMContentLoaded", loadOptions);
