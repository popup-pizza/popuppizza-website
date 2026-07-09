/* ═══════════════════════════════════════════════════════════════
   Pop-Up Pizza — FAQ Chat Widget
   Rule-based, no external services, works entirely in the browser.

   HOW TO UPDATE ANSWERS:
   Edit the `knowledgeBase` array below. Each entry has:
     keywords: words/phrases that trigger this answer (lowercase)
     answer:   the reply shown to the customer (HTML allowed)
   Order matters: the first entry with a keyword match wins.

   HOW TO INSTALL:
   Add this line just before </body> on every page:
     <script src="chat-widget.js"></script>
   ═══════════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  /* ── KNOWLEDGE BASE ─────────────────────────────────────────── */
  var knowledgeBase = [
    {
      keywords: ["menu", "what pizzas", "what pizza", "pizzas do you", "what do you sell", "options", "flavours", "flavors", "varieties"],
      answer: "Our current take &amp; bake menu:<br><br>" +
        "&bull; Base with Tomato, $8.50<br>" +
        "&bull; Cheese (tomato base + three cheese blend), $11<br>" +
        "&bull; Cheese &amp; Confit Garlic, $14<br>" +
        "&bull; Margherita, $14<br>" +
        "&bull; Pepperoni, $17<br>" +
        "&bull; Meatlovers, $20<br><br>" +
        "You can order from the <a href='pizza.html'>Take &amp; Bake page</a>."
    },
    {
      keywords: ["margherita"],
      answer: "Our Margherita is tomato base, basil &amp; mozzarella, $14. Order it on the <a href='pizza.html'>Take &amp; Bake page</a>."
    },
    {
      keywords: ["meatlovers", "meat lovers"],
      answer: "Meatlovers is tomato base, pepperoni, bacon, chorizo &amp; three cheese blend, $20. Order it on the <a href='pizza.html'>Take &amp; Bake page</a>."
    },
    {
      keywords: ["pepperoni"],
      answer: "Our Pepperoni pizza is tomato base, pepperoni &amp; three cheese blend, $17. Order it on the <a href='pizza.html'>Take &amp; Bake page</a>."
    },
    {
      keywords: ["confit garlic", "garlic"],
      answer: "Cheese &amp; Confit Garlic is tomato base, confit garlic and three cheese blend, $14. Order it on the <a href='pizza.html'>Take &amp; Bake page</a>."
    },
    {
      keywords: ["dough ball", "dough balls", "doughball"],
      answer: "Our frozen dough balls are 36 hr fermented, made with just flour, water, salt and yeast. Pricing:<br><br>" +
        "&bull; Single, $5<br>" +
        "&bull; Pack of 4, $18 ($4.50 each)<br>" +
        "&bull; Pack of 8, $32 ($4.00 each)<br><br>" +
        "Order on the <a href='dough.html'>Dough Balls page</a>."
    },
    {
      keywords: ["how much", "price", "prices", "cost", "pricing"],
      answer: "Take &amp; bake pizzas range from $8.50 (Base with Tomato) to $20 (Meatlovers). Frozen dough balls are $5 single, $18 for 4, or $32 for 8. See the <a href='pizza.html'>pizza menu</a> or <a href='dough.html'>dough balls</a> for details."
    },
    {
      keywords: ["kanga cup", "kanga", "dickson", "pickup location", "where do i pick up", "where to pick up", "collect"],
      answer: "During Kanga Cup week, pickup is at <strong>Dickson Playing Fields</strong>, 120&ndash;152 Antill St, Dickson ACT 2602, from <strong>Monday 13 July to Thursday 16 July, 2:00pm&ndash;4:00pm</strong> each day. Need a different time? Call 0429 649 812 or message @pop_uppizza."
    },
    {
      keywords: ["pickup time", "pick up time", "what time", "when can i", "collection time", "hours"],
      answer: "Kanga Cup pickup runs <strong>2:00pm&ndash;4:00pm</strong>, Monday 13 July to Thursday 16 July, at Dickson Playing Fields. If those hours don't suit, call 0429 649 812 or message @pop_uppizza and we'll try to arrange something."
    },
    {
      keywords: ["how do i cook", "how to cook", "how do i bake", "how to bake", "baking instructions", "cooking instructions", "oven", "how long", "temperature"],
      answer: "Baking instructions:<br><br>" +
        "1. From frozen? Defrost about 20 minutes first<br>" +
        "2. Pre-heat oven to <strong>200&deg;C</strong><br>" +
        "3. Bake on a tray for <strong>10&ndash;15 minutes</strong><br>" +
        "4. It's done when the cheese is golden and bubbling<br><br>" +
        "Full guide on the <a href='pizza.html#baking'>Take &amp; Bake page</a>."
    },
    {
      keywords: ["freeze", "freezer", "frozen", "how long does it last", "keep", "storage", "store", "fridge", "refrigerate"],
      answer: "Refrigerate for up to <strong>5 days</strong>, or freeze for up to <strong>3 months</strong>. If frozen, defrost for around 20 minutes before baking."
    },
    {
      keywords: ["gluten", "allergen", "allergy", "allergies", "dietary", "coeliac", "celiac"],
      answer: "Our pizza bases and dough balls contain <strong>gluten</strong>. Dough is made from flour, water, salt and yeast. Please tell us about any dietary requirements when ordering and we'll do our best to help."
    },
    {
      keywords: ["ingredients", "what's in", "whats in", "made of", "made from"],
      answer: "Our dough is 36 hr fermented and made from just <strong>flour, water, salt and yeast</strong>. Toppings vary by pizza, check the <a href='pizza.html#menu'>menu</a> for each pizza's ingredients. Note: contains gluten."
    },
    {
      keywords: ["how do i order", "how to order", "place an order", "ordering", "order online"],
      answer: "Order online via the <a href='pizza.html#order'>Take &amp; Bake page</a> or <a href='dough.html#order'>Dough Balls page</a>. Add items to your order, enter your details, and you'll get an order code. We'll then contact you to confirm and send a payment link."
    },
    {
      keywords: ["payment", "pay", "card", "cash", "eftpos"],
      answer: "After you place an order online, we'll contact you to confirm it and send a payment link. If you have payment questions, call 0429 649 812 or message @pop_uppizza."
    },
    {
      keywords: ["custom order", "custom", "special order", "group order", "bulk", "catering", "event order", "party"],
      answer: "We take custom and bulk orders. Use the <strong>Custom Order</strong> tab on the <a href='pizza.html#order'>Take &amp; Bake page</a>, or the <strong>Bulk / Custom Order</strong> tab on the <a href='dough.html#order'>Dough Balls page</a>, and we'll get back to you directly."
    },
    {
      keywords: ["loyalty", "stamp", "reward", "free pizza"],
      answer: "Order six pizzas and your seventh is on us. Every order earns a stamp, just mention your loyalty card when ordering and we'll keep track for you. Details on the <a href='pizza.html'>Take &amp; Bake page</a>."
    },
    {
      keywords: ["winter wonderland", "christmas in july", "fitters workshop", "kingston"],
      answer: "We'll be at the <strong>Winter Wonderland Christmas in July Market</strong> on Sunday 19 July, 9:30am&ndash;2:00pm, at the Fitters Workshop in Kingston, behind the Old Bus Depot Markets. More on our <a href='market.html'>Events page</a>."
    },
    {
      keywords: ["light up lyneham", "lyneham"],
      answer: "We'll be at <strong>Light Up Lyneham</strong> on Saturday 1 August, 3:00pm&ndash;8:00pm. More on our <a href='market.html'>Events page</a>."
    },
    {
      keywords: ["murrumbateman", "moving feast", "vintner", "winery"],
      answer: "We'll be at the <strong>Murrumbateman Moving Feast</strong> on 3&ndash;4 October at The Vintner's Daughter winery. Details to be confirmed, keep an eye on our <a href='market.html'>Events page</a> or @pop_uppizza."
    },
    {
      keywords: ["events", "markets", "where are you", "where can i find you", "next event", "upcoming", "stall"],
      answer: "Our upcoming events:<br><br>" +
        "&bull; <strong>Winter Wonderland</strong>, Sun 19 July, 9:30am&ndash;2pm, Fitters Workshop, Kingston<br>" +
        "&bull; <strong>Light Up Lyneham</strong>, Sat 1 Aug, 3pm&ndash;8pm<br>" +
        "&bull; <strong>Murrumbateman Moving Feast</strong>, 3&ndash;4 Oct, The Vintner's Daughter<br><br>" +
        "See the <a href='market.html'>Events page</a> for details."
    },
    {
      keywords: ["contact", "phone", "call", "email", "instagram", "get in touch", "reach you"],
      answer: "You can reach us on:<br><br>" +
        "&bull; Phone: <a href='tel:0429649812'>0429 649 812</a><br>" +
        "&bull; Email: <a href='mailto:popup.pizza.au@gmail.com'>popup.pizza.au@gmail.com</a><br>" +
        "&bull; Instagram: <a href='https://www.instagram.com/pop_uppizza' target='_blank'>@pop_uppizza</a>"
    },
    {
      keywords: ["delivery", "deliver", "ship", "post"],
      answer: "We don't offer delivery at this stage, orders are for pickup. During Kanga Cup week, pickup is at Dickson Playing Fields, 2&ndash;4pm daily. For anything else, message <a href='https://www.instagram.com/pop_uppizza' target='_blank'>@pop_uppizza</a> and we'll see what we can do."
    },
    {
      keywords: ["gas", "wood", "woodfired", "wood fired", "stone", "how is it cooked", "how are they cooked"],
      answer: "Our pizzas are <strong>stone-baked</strong> in gas-fired ovens, partially baked before you take them home, then finished to perfection in your own oven."
    },
    {
      keywords: ["hello", "hi", "hey", "gday", "g'day"],
      answer: "Hi there! I can help with questions about our menu, prices, pickup times, baking instructions, events, and more. What would you like to know?"
    },
    {
      keywords: ["thank", "thanks", "cheers", "ta"],
      answer: "You're welcome! Anything else I can help with?"
    }
  ];

  var fallbackAnswer = "I'm not sure about that one, but a real human can help! " +
    "Call <a href='tel:0429649812'>0429 649 812</a>, email <a href='mailto:popup.pizza.au@gmail.com'>popup.pizza.au@gmail.com</a>, " +
    "or message <a href='https://www.instagram.com/pop_uppizza' target='_blank'>@pop_uppizza</a> on Instagram.";

  var suggestedQuestions = [
    "What's on the menu?",
    "When is pickup?",
    "How do I bake it?",
    "What events are coming up?"
  ];

  /* ── MATCHING ENGINE ────────────────────────────────────────── */
  function findAnswer(question) {
    var q = question.toLowerCase().trim();
    for (var i = 0; i < knowledgeBase.length; i++) {
      var entry = knowledgeBase[i];
      for (var j = 0; j < entry.keywords.length; j++) {
        if (q.indexOf(entry.keywords[j]) !== -1) {
          return entry.answer;
        }
      }
    }
    return fallbackAnswer;
  }

  /* ── STYLES ─────────────────────────────────────────────────── */
  var css = [
    "#ppz-chat-btn{position:fixed;bottom:24px;right:24px;z-index:9998;width:56px;height:56px;border-radius:50%;background:#a8532f;color:#fff;border:none;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,0.25);font-size:24px;display:flex;align-items:center;justify-content:center;transition:transform .15s,background .2s;font-family:'Inter',sans-serif}",
    "#ppz-chat-btn:hover{background:#7d3d22;transform:translateY(-2px)}",
    "#ppz-chat-panel{position:fixed;bottom:92px;right:24px;z-index:9999;width:340px;max-width:calc(100vw - 32px);height:460px;max-height:calc(100vh - 120px);background:#faf7f2;border-radius:8px;box-shadow:0 8px 40px rgba(0,0,0,0.3);display:none;flex-direction:column;overflow:hidden;font-family:'Inter',sans-serif}",
    "#ppz-chat-panel.open{display:flex}",
    "#ppz-chat-header{background:#22201d;color:#fff;padding:14px 18px;display:flex;align-items:center;justify-content:space-between}",
    "#ppz-chat-header h4{margin:0;font-size:14px;font-weight:600;letter-spacing:.04em}",
    "#ppz-chat-header small{display:block;font-size:11px;color:rgba(255,255,255,.5);font-weight:400;margin-top:2px}",
    "#ppz-chat-close{background:none;border:none;color:rgba(255,255,255,.6);font-size:20px;cursor:pointer;line-height:1;padding:4px}",
    "#ppz-chat-close:hover{color:#fff}",
    "#ppz-chat-messages{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px}",
    ".ppz-msg{max-width:85%;padding:10px 14px;border-radius:10px;font-size:13px;line-height:1.55;word-wrap:break-word}",
    ".ppz-msg-bot{background:#fff;color:#22201d;align-self:flex-start;border:1px solid #ece6db}",
    ".ppz-msg-user{background:#a8532f;color:#fff;align-self:flex-end}",
    ".ppz-msg a{color:#a8532f;text-decoration:underline}",
    ".ppz-msg-user a{color:#fff}",
    "#ppz-chat-suggestions{padding:0 16px 10px;display:flex;flex-wrap:wrap;gap:6px}",
    ".ppz-suggestion{background:#ece6db;border:none;border-radius:14px;padding:6px 12px;font-size:11px;color:#22201d;cursor:pointer;font-family:'Inter',sans-serif;transition:background .15s}",
    ".ppz-suggestion:hover{background:#a8532f;color:#fff}",
    "#ppz-chat-inputrow{display:flex;border-top:1px solid #ece6db;background:#fff}",
    "#ppz-chat-input{flex:1;border:none;padding:13px 14px;font-size:13px;font-family:'Inter',sans-serif;background:transparent;outline:none;color:#22201d}",
    "#ppz-chat-send{background:#a8532f;color:#fff;border:none;padding:0 18px;cursor:pointer;font-size:15px;transition:background .2s}",
    "#ppz-chat-send:hover{background:#7d3d22}",
    "@media (max-width:600px){#ppz-chat-panel{right:16px;bottom:84px}#ppz-chat-btn{right:16px;bottom:16px}}"
  ].join("\n");

  /* ── WIDGET DOM ─────────────────────────────────────────────── */
  function buildWidget() {
    var style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);

    var btn = document.createElement("button");
    btn.id = "ppz-chat-btn";
    btn.setAttribute("aria-label", "Open chat");
    btn.innerHTML = "&#128172;";

    var panel = document.createElement("div");
    panel.id = "ppz-chat-panel";
    panel.innerHTML =
      '<div id="ppz-chat-header">' +
        '<div><h4>Pop-Up Pizza</h4><small>Quick answers, or reach a human any time</small></div>' +
        '<button id="ppz-chat-close" aria-label="Close chat">&times;</button>' +
      '</div>' +
      '<div id="ppz-chat-messages"></div>' +
      '<div id="ppz-chat-suggestions"></div>' +
      '<div id="ppz-chat-inputrow">' +
        '<input id="ppz-chat-input" type="text" placeholder="Ask a question..." aria-label="Type your question" />' +
        '<button id="ppz-chat-send" aria-label="Send">&#10148;</button>' +
      '</div>';

    document.body.appendChild(btn);
    document.body.appendChild(panel);

    var messages = panel.querySelector("#ppz-chat-messages");
    var input = panel.querySelector("#ppz-chat-input");
    var suggestionsEl = panel.querySelector("#ppz-chat-suggestions");

    function addMessage(text, who) {
      var div = document.createElement("div");
      div.className = "ppz-msg ppz-msg-" + who;
      if (who === "bot") { div.innerHTML = text; } else { div.textContent = text; }
      messages.appendChild(div);
      messages.scrollTop = messages.scrollHeight;
    }

    function renderSuggestions() {
      suggestionsEl.innerHTML = "";
      suggestedQuestions.forEach(function (q) {
        var b = document.createElement("button");
        b.className = "ppz-suggestion";
        b.textContent = q;
        b.addEventListener("click", function () { ask(q); });
        suggestionsEl.appendChild(b);
      });
    }

    function ask(question) {
      if (!question.trim()) return;
      addMessage(question, "user");
      input.value = "";
      suggestionsEl.innerHTML = "";
      setTimeout(function () {
        addMessage(findAnswer(question), "bot");
      }, 350);
    }

    btn.addEventListener("click", function () {
      var isOpen = panel.classList.toggle("open");
      if (isOpen && messages.children.length === 0) {
        addMessage("Hi! I can answer quick questions about our menu, prices, pickup, baking instructions, and events. What can I help with?", "bot");
        renderSuggestions();
      }
      if (isOpen) input.focus();
    });

    panel.querySelector("#ppz-chat-close").addEventListener("click", function () {
      panel.classList.remove("open");
    });

    panel.querySelector("#ppz-chat-send").addEventListener("click", function () {
      ask(input.value);
    });

    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") ask(input.value);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildWidget);
  } else {
    buildWidget();
  }
})();
