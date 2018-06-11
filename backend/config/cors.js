// normally move these params into env file
var whitelist = ['http://127.0.0.1:8080/', 'http://192.168.0.10:8080', 'http://localhost:8080',
    'https://stockmarket.khacquyetdang.com'
]
exports.corsOptions = {
    origin: whitelist
}