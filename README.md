# 🔐 PR Guardian — Infrastructure Security Scanner

## 📌 Problem

Infrastructure code (Terraform, CloudFormation, etc.) often contains security mistakes like:

* Public access
* No encryption
* Hardcoded passwords
* Missing logging

These issues are usually detected **too late**, after deployment.

---

## 💡 Solution

PR Guardian is a tool that scans infrastructure code **before deployment** to detect security misconfigurations and help developers fix them early.

---

## 🚀 Current Features

* 🔍 **Code Scanner**

  * Detects:

    * Open access (`0.0.0.0/0`)
    * Public resources
    * Disabled encryption
    * Hardcoded credentials
    * Missing logging

* 📊 **Security Score**

  * Provides a score out of 100 based on issues found

* 📄 **GitHub PR Scan (Manual)**

  * Fetches and scans Pull Request code

* 💬 **PR Commenting**

  * Posts issues and suggested fixes on the PR

* 🖥️ **Simple UI**

  * Scan code manually or via GitHub PR

---

## 🛠️ Tech Stack

Node.js, Express, HTML, CSS, JavaScript, GitHub API

---

## ⚠️ Limitations

* Manual trigger (no CI/CD automation yet)
* No automatic merge blocking
* Rule-based detection (no AI yet)

---

## 🎯 Goal

To help developers **identify and fix security issues early** before deployment.
