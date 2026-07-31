async function scanCode() {
  const code = document.getElementById("codeInput").value;

  const response = await fetch("http://localhost:5000/scan", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ code })
  });

  const data = await response.json();

  let outputHTML = "";

  outputHTML += `🔐 <b>Security Score: ${data.score}/100</b><br><br>`;

  if (data.safe) {
    outputHTML += "✅ Safe to Merge";
  } else {
    outputHTML += "❌ <b>Merge Blocked</b><br><br>";

    data.issues.forEach(issue => {
      outputHTML += `
        🔴 [${issue.category || "General"}] <b>${issue.severity}</b> - ${issue.msg} 
        (Line ${issue.line || "?"}) <br>
      `;
    });

    outputHTML += "<br><b>💡 Suggested Fixes:</b><br>";

    data.issues.forEach(issue => {
      if (issue.msg.includes("Open access")) {
        outputHTML += "➡️ Restrict IP range instead of 0.0.0.0/0<br>";
      }
      if (issue.msg.includes("Public storage")) {
        outputHTML += "➡️ Disable public access<br>";
      }
      if (issue.msg.includes("Encryption")) {
        outputHTML += "➡️ Enable encryption<br>";
      }
      if (issue.msg.includes("credential")) {
        outputHTML += "➡️ Move secrets to environment variables<br>";
      }
      if (issue.msg.includes("Public IP")) {
        outputHTML += "➡️ Disable public IP<br>";
      }
      if (issue.msg.includes("Logging")) {
        outputHTML += "➡️ Enable logging<br>";
      }
    });
  }

  document.getElementById("output").innerHTML = outputHTML;
}


// ================== FETCH & SCAN GITHUB PR ==================
async function scanGithubPR() {
  const owner = document.getElementById("owner").value;
  const repo = document.getElementById("repo").value;
  const pr = document.getElementById("pr").value;

  const res = await fetch(
    `http://localhost:5000/github-pr?owner=${owner}&repo=${repo}&pull_number=${pr}`
  );

  const data = await res.json();
  console.log(data);

  // Show the fetched Terraform code
  document.getElementById("codeInput").value = data.code;

   // Scan only the added lines
   document.getElementById("codeInput").value = data.scanCode;

   scanCode();

   // Restore the displayed code after scanning
   document.getElementById("codeInput").value = data.code;
}

// ================== POST COMMENT ==================
async function commentOnPR() {
  const owner = document.getElementById("owner").value;
  const repo = document.getElementById("repo").value;
  const pr = document.getElementById("pr").value;

  const message = document.getElementById("output").innerText;

  await fetch("http://localhost:5000/comment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      owner,
      repo,
      pull_number: pr,
      message
    })
  });

  alert("✅ Comment posted to GitHub PR!");
}