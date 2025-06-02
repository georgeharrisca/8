// Function to handle file input and read the file as text
document.getElementById("fileInput").addEventListener("change", function(e) {
  const file = e.target.files[0];
  
  if (!file) {
    alert("Please select a file.");
    return;
  }

  const reader = new FileReader();

  reader.onerror = function() {
    alert("Error reading the file.");
  };

  reader.onload = function(event) {
    const xmlText = event.target.result;

    // Log the file content for debugging purposes
    console.log("File content loaded:", xmlText);

    // Check if it's an XML file by verifying the first part of the content
    if (!xmlText.startsWith('<?xml')) {
      alert("Please upload a valid XML file.");
      return;
    }

    window.xmlText = xmlText;
  };

  reader.readAsText(file);
});

// Function to start the extraction process
function startExtraction() {
  if (!window.xmlText) {
    alert("Please upload a valid XML file first.");
    return;
  }

  // Step 1: Extract everything from the beginning of the file up to and including <part-list>
  const partListIndex = window.xmlText.indexOf("<part-list>");
  if (partListIndex === -1) {
    alert("<part-list> tag not found in the XML file.");
    return;
  }

  const partListEndIndex = window.xmlText.indexOf("</part-list>") + "</part-list>".length;
  const extractedContent = window.xmlText.slice(0, partListEndIndex);

  // Save the extracted content for later
  window.extractedContent = extractedContent;

  // Display the extracted content (for debugging or preview)
  document.getElementById("output").textContent = extractedContent;

  // Enable the next extraction button
  document.getElementById("nextButton").style.display = "inline-block";

  // Hide the start extraction button after it has been clicked
  document.getElementById("startButton").style.display = "none";
}

// Function to extract content from <score-part id="P1"> to </score-part>
function extractScorePart() {
  console.log("Extract Score Part function triggered");

  if (!window.xmlText) {
    alert("Please upload a valid XML file first.");
    return;
  }

  // Step 2: Extract everything from <score-part id="P1"> to the next </score-part>
  const scorePartStartIndex = window.xmlText.indexOf('<score-part id="P1">');
  if (scorePartStartIndex === -1) {
    alert("<score-part id=\"P1\"> tag not found in the XML file.");
    return;
  }

  const scorePartEndIndex = window.xmlText.indexOf('</score-part>', scorePartStartIndex) + '</score-part>'.length;
  const scorePartContent = window.xmlText.slice(scorePartStartIndex, scorePartEndIndex);

  // Step 3: Append the extracted score-part content and </part-list>
  window.extractedContent += "\n" + scorePartContent + "\n</part-list>";

  // Display the updated content (for debugging or preview)
  document.getElementById("output").textContent = window.extractedContent;

  // Enable the next extraction button
  document.getElementById("nextPartButton").style.display = "inline-block";
}
