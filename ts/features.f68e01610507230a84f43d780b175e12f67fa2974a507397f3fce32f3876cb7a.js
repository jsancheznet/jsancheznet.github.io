(() => {
  // ns-hugo-imp:/run/media/jsanchez/Work/Projects/jsanchez.net/themes/hugo-tania/assets/ts/colorScheme.ts
  var ThemeColorScheme = class {
    localStorageKey = "ThemeColorScheme";
    currentScheme;
    systemPreferScheme;
    constructor(toggleEl) {
      this.bindMatchMedia();
      this.currentScheme = this.getSavedScheme();
      this.dispatchEvent(document.documentElement.dataset.userColorScheme);
      if (toggleEl)
        this.bindClick(toggleEl);
      if (document.body.style.transition == "")
        document.body.style.setProperty("transition", "background-color .3s ease");
    }
    saveScheme() {
      localStorage.setItem(this.localStorageKey, this.currentScheme);
    }
    bindClick(toggleEl) {
      toggleEl.addEventListener("click", (e) => {
        if (this.isDark()) {
          this.currentScheme = "light";
        } else {
          this.currentScheme = "dark";
        }
        this.setBodyClass();
        if (this.currentScheme == this.systemPreferScheme) {
          this.currentScheme = "auto";
        }
        this.saveScheme();
      });
    }
    isDark() {
      return this.currentScheme == "dark" || this.currentScheme == "auto" && this.systemPreferScheme == "dark";
    }
    dispatchEvent(colorScheme) {
      const event = new CustomEvent("onColorSchemeChange", {
        detail: colorScheme
      });
      window.dispatchEvent(event);
    }
    setBodyClass() {
      if (this.isDark()) {
        document.documentElement.dataset.userColorScheme = "dark";
      } else {
        document.documentElement.dataset.userColorScheme = "light";
      }
      this.dispatchEvent(document.documentElement.dataset.userColorScheme);
    }
    getSavedScheme() {
      const savedScheme = localStorage.getItem(this.localStorageKey);
      if (savedScheme == "light" || savedScheme == "dark" || savedScheme == "auto") return savedScheme;
      else return "auto";
    }
    bindMatchMedia() {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
        if (e.matches) {
          this.systemPreferScheme = "dark";
        } else {
          this.systemPreferScheme = "light";
        }
        this.setBodyClass();
      });
    }
  };
  var colorScheme_default = ThemeColorScheme;

  // ns-hugo-imp:/run/media/jsanchez/Work/Projects/jsanchez.net/themes/hugo-tania/assets/ts/copyButton.ts
  var codeBlocks = document.querySelectorAll(".article-post .highlight");
  var copyText = `Copy`;
  var copiedText = `Copied!`;
  var renderCopyButton = function() {
    codeBlocks.forEach((codeBlock) => {
      const copyButton = document.createElement("button");
      copyButton.innerHTML = copyText;
      copyButton.classList.add("copyCodeButton");
      codeBlock.appendChild(copyButton);
      const pre = codeBlock.getElementsByTagName("pre");
      let codeIndex = 0;
      if (pre.length == 2) {
        codeIndex = 1;
      }
      const code = pre[codeIndex].textContent;
      copyButton.addEventListener("click", () => {
        navigator.clipboard.writeText(code).then(() => {
          copyButton.textContent = copiedText;
          setTimeout(() => {
            copyButton.textContent = copyText;
          }, 1e3);
        }).catch((err) => {
          alert(err);
          console.log("Something went wrong", err);
        });
      });
    });
  };

  // ns-hugo-imp:/run/media/jsanchez/Work/Projects/jsanchez.net/themes/hugo-tania/assets/ts/footnotes.ts
  var removeEl = (el) => {
    if (!el) return;
    el.remove ? el.remove() : el.parentNode.removeChild(el);
  };
  var insertAfter = (target, sib) => {
    target.after ? target.after(sib) : target.parentNode.insertBefore(sib, target.nextSibling);
  };
  var insideOut = (el) => {
    var p = el.parentNode, x = el.innerHTML, c = document.createElement("div");
    insertAfter(p, c);
    c.appendChild(el);
    el.innerHTML = "";
    el.appendChild(p);
    p.innerHTML = x;
    insertAfter(c, c.firstElementChild);
    removeEl(c);
  };
  var renderFootnotes = function() {
    document.querySelectorAll('.footnotes > ol > li[id^="fn"], #refs > div[id^="ref-"]').forEach(function(fn) {
      let a = document.querySelectorAll('a[href="#' + fn.id + '"]');
      if (a.length === 0) return;
      a.forEach(function(el) {
        el.removeAttribute("href");
      });
      let newA = a[0];
      let side = document.createElement("div");
      side.className = "side side-right";
      if (/^fn/.test(fn.id)) {
        side.innerHTML = fn.innerHTML;
        var number = newA.innerHTML;
        side.firstElementChild.innerHTML = '<span class="bg-number">' + number + "</span> " + side.firstElementChild.innerHTML;
        removeEl(side.querySelector('a[href^="#fnref"]'));
        let newAParent = newA.parentNode;
        newAParent.tagName === "SUP" && insideOut(newA);
      } else {
        side.innerHTML = fn.outerHTML;
        newA = newA.parentNode;
      }
      insertAfter(newA, side);
      newA.classList.add("note-ref");
      removeEl(fn);
    });
    document.querySelectorAll(".footnotes, #refs").forEach(function(fn) {
      var items = fn.children;
      if (fn.id === "refs") return items.length === 0 && removeEl(fn);
      if (items.length !== 2 || items[0].tagName !== "HR" || items[1].tagName !== "OL") return;
      items[1].childElementCount === 0 && removeEl(fn);
    });
  };

  // <stdin>
  var enableFootnotes = false;
  if (document.currentScript) {
    enableFootnotes = document.currentScript.dataset.enableFootnotes == "true";
  }
  var init = () => {
    new colorScheme_default(document.getElementById("dark-mode-button"));
    if (enableFootnotes) {
      renderFootnotes();
    }
    renderCopyButton();
  };
  window.addEventListener("load", () => {
    setTimeout(function() {
      init();
    }, 0);
  });
})();
