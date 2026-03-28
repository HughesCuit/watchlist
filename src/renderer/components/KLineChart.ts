<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TradingView Widget</title>
  <script>
    (function() {
      window.tradingViewWidget = {
        widget: null,
        stockId: null,
        period: 'D'
      }
      
      window.tradingViewWidget.setStock = function(code) {
        if (!window.tradingViewWidget.widget) return
        window.tradingViewWidget.stockId = 'NASDAQ:' + code.toUpperCase()
      }
      
      window.tradingViewWidget.setPeriod = function(period) {
        window.tradingViewWidget.period = period
      }
      
      window.tradingViewWidget.render = function(containerId) {
        if (!window.tradingViewWidget.widget) {
          const container = document.getElementById(containerId)
          const script = document.createElement('script')
          script.src = 'https://s3.tradingview.com/tv.js'
          script.onload = function() {
            new TradingView.widget({
              'autosize': true,
              'symbol': window.tradingViewWidget.stockId || 'NASDAQ:AAPL',
              'interval': window.tradingViewWidget.period || 'D',
              'timezone': 'Asia/Shanghai',
              'theme': 'light',
              'style': '1',
              'locale': 'zh_CN',
              'toolbar_bg': '#f1f3f6',
              'enable_publishing': false,
              'allow_symbol_change': true,
              'container_id': containerId,
              'hide_top_toolbar': true,
              'hide_legend': true
            })
            window.tradingViewWidget.widget = true
          }
          document.body.appendChild(script)
        }
      }
    })()
  </script>
</head>
<body>
  <div id="tv-widget"></div>
  <script>
    window.tradingViewWidget.render('tv-widget')
  </script>
</body>
</html>