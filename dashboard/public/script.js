document.addEventListener("DOMContentLoaded", function () {
  const popupStacks = {};

  const createPopup = (options) => {
    const popup = document.createElement("div");
    popup.classList.add("popup");

    // Main container styles
    popup.style.position = "fixed";
    popup.style.padding = "20px";
    popup.style.width = "320px";
    popup.style.height = "auto";
    popup.style.overflow = "hidden";
    popup.style.background = "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))";
    popup.style.backdropFilter = "blur(10px)";
    popup.style.color = options.mainTextColor;
    popup.style.borderRadius = "12px";
    popup.style.boxShadow = "0 12px 30px rgba(0, 0, 0, 0.2)";
    popup.style.fontSize = "16px";
    popup.style.zIndex = 1000 + options.index;
    popup.style.opacity = "0";
    popup.style.transform = "scale(0.95)";
    popup.style.transition = "transform 0.4s ease, opacity 0.4s ease";

    const popupKey = `${options.triggerScrollPercentage}-${options.popupLocation}`;
    if (!popupStacks[popupKey]) {
      popupStacks[popupKey] = 0;
    }

    const offset = 15 + popupStacks[popupKey] * 80;
    popupStacks[popupKey] += 1;

    switch (options.popupLocation) {
      case "top-left":
        popup.style.top = `${offset}px`;
        popup.style.left = "20px";
        popup.style.transformOrigin = "top left";
        break;
      case "top-right":
        popup.style.top = `${offset}px`;
        popup.style.right = "20px";
        popup.style.transformOrigin = "top right";
        break;
      case "bottom-left":
        popup.style.bottom = `${offset}px`;
        popup.style.left = "20px";
        popup.style.transformOrigin = "bottom left";
        break;
      case "bottom-right":
        popup.style.bottom = `${offset}px`;
        popup.style.right = "20px";
        popup.style.transformOrigin = "bottom right";
        break;
      default:
        console.error("Invalid popupLocation specified");
    }

    // Image styling (circular image)
    const img = document.createElement("img");
    img.src = options.imageUrl;
    img.alt = "logo";
    img.style.width = "50px";
    img.style.height = "50px";
    img.style.marginRight = "15px";
    img.style.borderRadius = "50%";
    img.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";

    const textContainer = document.createElement("div");

    // Main text styling
    const mainText = document.createElement("h3");
    mainText.textContent = options.mainText;
    mainText.style.margin = "0";
    mainText.style.color = options.mainTextColor;
    mainText.style.fontFamily = `"__Recursive_71c628", "__Recursive_Fallback_71c628", sans-serif`;
    mainText.style.overflow = "hidden";
    mainText.style.whiteSpace = "nowrap";
    mainText.style.textOverflow = "ellipsis";
    mainText.style.marginBottom = "6px";
    mainText.style.fontWeight = "700";
    mainText.style.fontSize = "18px";
    mainText.style.letterSpacing = "0.5px";
    mainText.style.textShadow = "none";

    // Sub text styling
    const subText = document.createElement("p");
    subText.textContent = options.subText;
    subText.style.margin = "0";
    subText.style.color = options.subtextColor;
    subText.style.fontFamily = `"__Recursive_71c628", "__Recursive_Fallback_71c628", sans-serif`;
    subText.style.overflow = "hidden";
    subText.style.whiteSpace = "nowrap";
    subText.style.textOverflow = "ellipsis";
    subText.style.fontSize = "14px";
    subText.style.fontWeight = "400";
    subText.style.textShadow = "none";

    textContainer.appendChild(mainText);
    textContainer.appendChild(subText);

    const content = document.createElement("div");
    content.style.display = "flex";
    content.style.alignItems = "center";

    content.appendChild(img);
    content.appendChild(textContainer);
    popup.appendChild(content);

    // Ensure the root element exists
    let rootElement = document.getElementById("popup-root");
    if (!rootElement) {
      // If no root element is found, create it
      rootElement = document.createElement("div");
      rootElement.id = "popup-root";
      document.body.appendChild(rootElement);
    }

    rootElement.appendChild(popup);

    // Show animation
    setTimeout(() => {
      popup.style.opacity = "1";
      popup.style.transform = "scale(1)";
    }, 100);

    // Hide animation and removal
    setTimeout(() => {
      popup.style.opacity = "0";
      popup.style.transform = "scale(0.95)";
      setTimeout(() => {
        popup.remove();
        popupStacks[popupKey] -= 1;
      }, 400);
    }, options.disappearTime);
  };

  // Fetching and showing popups
  const fetchAndShowPopups = async () => {
    try {
      const scriptElement = document.getElementById("tech_popup");
      const webId = scriptElement.getAttribute("webid");
      const userId = scriptElement.getAttribute("userid");

      const response = await fetch(
        `https://banana-tech.onrender.com/api/v1/user/${userId}/websites/${webId}`
      );
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const array = await response.json();
      const templates = [];

      for (const data of array) {
        try {
          const dataTemplate = await fetch(
            `https://banana-tech.onrender.com/api/v1/template/${data}`
          );
          if (!dataTemplate.ok) {
            throw new Error(
              `Network response was not ok: ${dataTemplate.statusText}`
            );
          }

          const template = await dataTemplate.json();
          templates.push(template);
        } catch (error) {
          console.error("Error fetching template:", error);
        }
      }

      templates.forEach((data, index) => {
        let hasShown = false;
        const {
          mainText,
          subText,
          popupLocation,
          bgColor,
          mainTextColor,
          subtextColor,
          imageUrl,
          disappearTime,
          triggerEvent,
        } = data;

        const options = {
          mainText,
          subText,
          popupLocation,
          bgColor,
          mainTextColor,
          subtextColor,
          disappearTime,
          imageUrl,
          index,
          triggerScrollPercentage: triggerEvent,
        };

        const handleScroll = () => {
          const scrollPosition = window.scrollY + window.innerHeight;
          const totalHeight = document.documentElement.scrollHeight;
          const scrollPercent = (scrollPosition / totalHeight) * 100;

          if (scrollPercent >= options.triggerScrollPercentage && !hasShown) {
            createPopup(options);
            hasShown = true;
          }
        };

        if (options.triggerScrollPercentage === 0 && !hasShown) {
          createPopup(options);
          hasShown = true;
        } else {
          window.addEventListener("scroll", handleScroll);
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchAndShowPopups();
});
