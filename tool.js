// Function to handle file input and read the file as text
document.getElementById("fileInput").addEventListener("change", function(e) {
  const file = e.target.files[0];
  
  // Check if a file was selected
  if (!file) {
    alert("Please select a file.");
    return;
  }

  const reader = new FileReader();

  // Add error handling for file reading
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

    // Store the raw XML text globally for future extraction
    window.xmlText = xmlText;
  };

  // Read the file as text
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

  // Extract from the beginning of the file to just after the first appearance of <part-list>
  const partListEndIndex = partListIndex + "<part-list>".length;

  // Extract everything from the start of the file up to and including the first <part-list>
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
