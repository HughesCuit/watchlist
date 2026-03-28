<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Stock List Component</title>
  <style>
    .stock-list { list-style: none; padding: 0; }
    .stock-item {
      background: white;
      padding: 10px;
      margin: 4px 0;
      border-radius: 4px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: background 0.2s;
    }
    .stock-item:hover { background: #f8f9fa; }
    .stock-item.selected { border-left: 3px solid #007bff; }
    .stock-code { font-weight: bold; font-family: monospace; }
    .stock-name { color: #666; margin-left: 8px; }
    .stock-time { color: #999; font-size: 12px; }
    .stock-actions { display: none; gap: 8px; }
    .stock-item:hover .stock-actions { display: flex; }
    .btn {
      background: #e0e0e0;
      border: none;
      border-radius: 4px;
      padding: 4px 8px;
      cursor: pointer;
      font-size: 12px;
    }
    .btn:hover { background: #d0d0d0; }
    .btn.delete { background: #ff5252; color: white; }
    .btn.delete:hover { background: #ff3333; }
  </style>
</head>
<body>
  <ul class="stock-list" id="stockList"></ul>
  <script>
    let stocks = []
    let preferences = { sortBy: 'addedAt' }

    async function init() {
      stocks = await window.electronAPI.stocks.getAll()
      preferences = await window.electronAPI.preferences.get()
      render()
    }

    function render() {
      const stockList = document.getElementById('stockList')
      stockList.innerHTML = stocks.map((stock, index) => {
        const isSelected = preferences.selectedStockId === stock.id
        const time = new Date(stock.addedAt).toLocaleDateString()
        return `
          <li class="stock-item ${isSelected ? 'selected' : ''}" 
              onclick="selectStock('${stock.id}')">
            <div>
              <span class="stock-code">${stock.code}</span>
              ${stock.name ? `<span class="stock-name">${stock.name}</span>` : ''}
              <span class="stock-time">${time}</span>
            </div>
            <div class="stock-actions">
              <button class="btn delete" onclick="deleteStock(event, '${stock.id}')">删除</button>
            </div>
          </li>
        `
      }).join('')
    }

    async function selectStock(id) {
      preferences.selectedStockId = id
      await window.electronAPI.preferences.set(preferences)
      render()
    }

    async function deleteStock(event, id) {
      event.stopPropagation()
      if (confirm('确定要删除这只股票吗？')) {
        await stockService.remove(id)
        render()
      }
    }

    init()
  </script>
</body>
</html>