// Function to handle file input and read the file as text
document.getElementById("fileInput").addEventListener("change", function(e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = function(event) {
    const xmlText = event.target.result;
    window.xmlText = xmlText; // Store the raw XML text globally
  };

  reader.readAsText(file);
});

// Function to start the extraction process
function startExtraction() {
  if (!window.xmlText) {
    alert("Please upload a valid XML file first.");
    return;
  }

  // Find the position of the <part-list> tag in the XML text
  const partListIndex = window.xmlText.indexOf("<part-list>");
  if (partListIndex === -1) {
    alert("<part-list> tag not found in the XML file.");
    return;
  }

  // Extract everything from the beginning of the file to the end of the <part-list> tag
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
  if (!window.xmlText) {
    alert("Please upload a valid XML file first.");
    return;
  }

  // Find the position of <score-part id="P1">
  const scorePartStartIndex = window.xmlText.indexOf('<score-part id="P1">');
  if (scorePartStartIndex === -1) {
    alert("<score-part id=\"P1\"> tag not found in the XML file.");
    return;
  }

  // Find the position of the next </score-part>
  const scorePartEndIndex = window.xmlText.indexOf('</score-part>', scorePartStartIndex) + '</score-part>'.length;

  // Extract everything from <score-part id="P1"> to the next </score-part>
  const scorePartContent = window.xmlText.slice(scorePartStartIndex, scorePartEndIndex);

  // Append the extracted score-part content to the previously extracted content
  const newXmlString = window.extractedContent + "\n" + scorePartContent;

  // Save the combined XML content for later
  window.extractedContent = newXmlString;

  // Now, append </part-list> to close the part-list section
  window.extractedContent += "\n</part-list>";

  // Display the new content (for debugging or preview)
  document.getElementById("output").textContent = window.extractedContent;

  // Enable the next extraction button
  document.getElementById("nextPartButton").style.display = "inline-block";
}

// Function to extract content from <part id="P1"> to </part>
function extractPart() {
  if (!window.xmlText) {
    alert("Please upload a valid XML file first.");
    return;
  }

  // Find the position of <part id="P1">
  const partStartIndex = window.xmlText.indexOf('<part id="P1">');
  if (partStartIndex === -1) {
    alert("<part id=\"P1\"> tag not found in the XML file.");
    return;
  }

  // Find the position of the next </part>
  const partEndIndex = window.xmlText.indexOf('</part>', partStartIndex) + '</part>'.length;

  // Extract everything from <part id="P1"> to the next </part>
  const partContent = window.xmlText.slice(partStartIndex, partEndIndex);

  // Append the extracted part content to the previously extracted content
  const newXmlString = window.extractedContent + "\n" + partContent;

  // Save the combined XML content for later
  window.extractedContent = newXmlString;

  // Display the new content (for debugging or preview)
  document.getElementById("output").textContent = newXmlString;

  // Enable the final extraction button
  document.getElementById("finalizeButton").style.display = "inline-block";
}

// Function to add </score-partwise> at the end and finalize the XML
function finalizeXml() {
  if (!window.xmlText) {
    alert("Please upload a valid XML file first.");
    return;
  }

  // Append the </score-partwise> tag to the extracted content
  const finalXmlString = window.extractedContent + "\n</score-partwise>";

  // Display the final content (for debugging or preview)
  document.getElementById("output").textContent = finalXmlString;

  // Create a download link for the finalized XML file
  const blob = new Blob([finalXmlString], { type: "application/xml" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "final_extracted.xml";
  link.click();
}
