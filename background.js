// Context menu creation using an array for cleaner code
const contextMenus = [
  { id: "closeOtherTabs", title: "Close Other Tabs" },
  { id: "closeOtherTabsSameWindow", title: "Close Other Tabs (Same Window)" },
  { id: "closeOtherWindows", title: "Close Other Windows" },
  { id: "closeEverything", title: "Close Everything" }
];

browser.runtime.onInstalled.addListener(() => {
  contextMenus.forEach(menu => {
    browser.contextMenus.create({
      id: menu.id,
      title: menu.title,
      contexts: ["all"]
    });
  });
});

// Function to get protected URLs from storage
async function getProtectedUrls() {
  const { protectedUrls } = await browser.storage.sync.get("protectedUrls");
  return protectedUrls ? protectedUrls.split(",").map(url => url.trim()) : [];
}

// Helper to check if URL is protected
async function isProtectedUrl(url) {
  const protectedUrls = await getProtectedUrls();
  return protectedUrls.some(protectedUrl => url.includes(protectedUrl));
}

// Handle context menu clicks
browser.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "closeOtherTabs") {
    const tabs = await browser.tabs.query({});
    for (let t of tabs) {
      if (t.id !== tab.id && !(await isProtectedUrl(t.url))) {
        browser.tabs.remove(t.id);
      }
    }
  } else if (info.menuItemId === "closeOtherWindows") {
    const windows = await browser.windows.getAll();
    for (let w of windows) {
      if (w.id !== tab.windowId) {
        browser.windows.remove(w.id);
      }
    }
  } else if (info.menuItemId === "closeEverything") {
    const windows = await browser.windows.getAll();
    for (let w of windows) {
      browser.windows.remove(w.id);
    }
  } else if (info.menuItemId === "closeOtherTabsSameWindow") {
    const tabs = await browser.tabs.query({ windowId: tab.windowId });
    for (let t of tabs) {
      if (t.id !== tab.id && !(await isProtectedUrl(t.url))) {
        browser.tabs.remove(t.id);
      }
    }
  }
});

// Default action on toolbar icon click
browser.browserAction.onClicked.addListener(async (tab) => {
  const tabs = await browser.tabs.query({});
  for (let t of tabs) {
    if (t.id !== tab.id && t.url && !(await isProtectedUrl(t.url))) {
      browser.tabs.remove(t.id);
    }
  }
});

browser.commands.onCommand.addListener(async (command) => {
  if (command === "closeOtherTabs") {
    const [activeTab] = await browser.tabs.query({ active: true, currentWindow: true });
    if (activeTab) {
      const tabs = await browser.tabs.query({});
      for (let t of tabs) {
        if (t.id !== activeTab.id && t.url && !(await isProtectedUrl(t.url))) {
          browser.tabs.remove(t.id);
        }
  }
    }
  }
});
