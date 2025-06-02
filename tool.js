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

  // Extract from the beginning of the file to the first appearance of <part-list> (including <part-list> and </part-list>)
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
