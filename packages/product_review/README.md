# Product review extension for ANNAPOORANI

This extension allows customer to review and rate products.

> **Note**: This extension requires ANNAPOORANI version 1.0.0-rc.6 or higher.

## Installation guide

### Step 1: Install the extension using npm:

```bash
npm install @ANNAPOORANI/product_review

```

### Step 2: Enable the extension

Edit the `config/default.json` file in the root directory of your ANNAPOORANI installation and add the following line to the `extensions` section:

```json
{
  ...,
  "system": {
    ...,
    "extensions": [
      ...,
      {
        "name": "product_review",
        "resolve": "node_modules/@ANNAPOORANI/product_review",
        "enabled": true,
        "priority": 10
      }
    ]
  }
}
```

### Step 3: Run the build command

```bash
npm run build
```