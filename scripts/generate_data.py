import os
import datetime
import random

# Generate realistic NIFTY 50 daily historical OHLC dataset (2018 to 2024)
# Captures:
# 1. 2018: 10400 -> 11700 -> 10100 -> 10800
# 2. 2019: 10800 -> 12100 (Sept tax cut surge) -> 12250
# 3. 2020: 12300 in Jan -> Crash Feb/March to 7511 (-3% to -10% drop days) -> V-recovery to 13980 by Dec
# 4. 2021: 14000 -> 18600 rally (occasional sharp dips)
# 5. 2022: Ukraine war dip to 15700 -> bounce to 18100 -> June dip to 15200 -> recovery to 18800
# 6. 2023 - Jan 2024: 18000 -> 16850 (Adani drop in Feb) -> 20000 in Sept -> 21700 in Dec/Jan 2024

random.seed(42)

start_date = datetime.date(2018, 1, 1)
end_date = datetime.date(2024, 1, 15)

# Key historical anchor milestones (date, approximate close)
anchors = [
    (datetime.date(2018, 1, 1), 10435.5),
    (datetime.date(2018, 8, 28), 11738.5),
    (datetime.date(2018, 10, 26), 10030.0), # IL&FS crisis
    (datetime.date(2019, 6, 3), 12088.5),
    (datetime.date(2019, 8, 23), 10829.3), # Budget/FPI tax selloff
    (datetime.date(2019, 9, 20), 11274.2), # Corporate tax cut surge (+5.3% day)
    (datetime.date(2020, 1, 20), 12352.0),
    (datetime.date(2020, 2, 28), 11201.7), # COVID emergence (-3.7%)
    (datetime.date(2020, 3, 9), 10451.4),  # Oil crash & COVID (-4.9%)
    (datetime.date(2020, 3, 12), 9590.1),  # WHO pandemic declared (-8.3%)
    (datetime.date(2020, 3, 23), 7610.2),  # Lockdown lockdown bottom (-12.98%)
    (datetime.date(2020, 4, 30), 9859.9),  # Initial recovery
    (datetime.date(2020, 10, 19), 11873.0),
    (datetime.date(2020, 12, 31), 13981.7),
    (datetime.date(2021, 2, 1), 14281.2),  # Budget rally
    (datetime.date(2021, 4, 12), 14310.8), # Second wave dip (-3.5%)
    (datetime.date(2021, 10, 19), 18604.4), # All time high
    (datetime.date(2021, 11, 26), 17026.4), # Omicron scare (-2.9%)
    (datetime.date(2022, 2, 24), 16247.9), # Ukraine invasion (-4.8%)
    (datetime.date(2022, 6, 17), 15293.5), # Global rate hike bottom
    (datetime.date(2022, 12, 1), 18812.5),
    (datetime.date(2023, 1, 27), 17604.3), # Hindenburg/Adani drop (-2.2%)
    (datetime.date(2023, 3, 20), 16988.4), # SVB banking crisis bottom
    (datetime.date(2023, 9, 15), 20192.3), # First time cross 20k
    (datetime.date(2023, 10, 26), 18857.2), # Middle east conflict dip
    (datetime.date(2023, 12, 29), 21731.4), # Year-end all time high
    (datetime.date(2024, 1, 15), 22097.4)
]

# Generate daily business days
current_date = start_date
trading_days = []
while current_date <= end_date:
    if current_date.weekday() < 5: # Mon-Fri
        trading_days.append(current_date)
    current_date += datetime.timedelta(days=1)

# Interpolate anchor prices and add realistic daily volatility & exact historical shock dates
def get_anchor_target(dt):
    for i in range(len(anchors) - 1):
        d1, p1 = anchors[i]
        d2, p2 = anchors[i+1]
        if d1 <= dt <= d2:
            frac = (dt - d1).total_seconds() / (d2 - d1).total_seconds()
            return p1 + frac * (p2 - p1)
    return anchors[-1][1]

prices = []
prev_close = anchors[0][1]

# Specific known shock dates with specific close-to-close returns
known_shocks = {
    datetime.date(2018, 2, 2): -0.023, # LTCG budget
    datetime.date(2018, 10, 4): -0.024, # Fuel excise / RBI
    datetime.date(2019, 7, 8): -0.021, # Post budget
    datetime.date(2019, 9, 20): +0.053, # Tax cut surge
    datetime.date(2020, 2, 28): -0.037, # COVID selloff
    datetime.date(2020, 3, 9): -0.049, # Black Monday 1
    datetime.date(2020, 3, 12): -0.082, # Pandemic declaration
    datetime.date(2020, 3, 16): -0.056, # Rate cut panic
    datetime.date(2020, 3, 18): -0.056,
    datetime.date(2020, 3, 23): -0.1298, # Complete lockdown
    datetime.date(2020, 3, 25): +0.066, # Rebound
    datetime.date(2020, 4, 7): +0.087, # Big stimulus rally
    datetime.date(2020, 5, 4): -0.027,
    datetime.date(2020, 5, 18): -0.032,
    datetime.date(2020, 6, 11): -0.021,
    datetime.date(2020, 9, 21): -0.022,
    datetime.date(2021, 2, 26): -0.038, # Bond yield spike
    datetime.date(2021, 4, 12): -0.035, # Second wave lockdown
    datetime.date(2021, 11, 26): -0.029, # Omicron scare
    datetime.date(2022, 1, 24): -0.027, # Fed hawkish selloff
    datetime.date(2022, 2, 24): -0.048, # Ukraine invasion
    datetime.date(2022, 3, 7): -0.024,
    datetime.date(2022, 5, 4): -0.023, # Off-cycle RBI rate hike
    datetime.date(2022, 5, 19): -0.026,
    datetime.date(2022, 6, 13): -0.026, # US CPI 8.6%
    datetime.date(2022, 6, 16): -0.021,
    datetime.date(2022, 12, 23): -0.018,
    datetime.date(2023, 1, 27): -0.022, # Adani report shock
    datetime.date(2023, 3, 13): -0.018, # SVB collapse
}

for dt in trading_days:
    target = get_anchor_target(dt)
    if dt in known_shocks:
        ret = known_shocks[dt]
        close = prev_close * (1.0 + ret)
    else:
        # Mean reverting random walk towards target trend
        drift = (target - prev_close) / max(10, (anchors[-1][0] - dt).days)
        noise = random.gauss(0, 0.0085 * prev_close)
        close = prev_close + drift + noise

    # Build realistic Open, High, Low
    open_drift = random.gauss(0, 0.004 * prev_close)
    open_price = prev_close + open_drift
    high_margin = abs(random.gauss(0.005 * close, 0.003 * close))
    low_margin = abs(random.gauss(0.005 * close, 0.003 * close))
    high_price = max(open_price, close) + high_margin
    low_price = min(open_price, close) - low_margin

    # Volume (in millions)
    base_vol = 250_000_000
    if abs(close - prev_close) / prev_close > 0.02:
        vol = int(base_vol * random.uniform(1.8, 3.2))
    else:
        vol = int(base_vol * random.uniform(0.7, 1.4))

    prices.append({
        'Date': dt.strftime('%Y-%m-%d'),
        'Open': round(open_price, 2),
        'High': round(high_price, 2),
        'Low': round(low_price, 2),
        'Close': round(close, 2),
        'Volume': vol
    })
    prev_close = close

os.makedirs('data', exist_ok=True)
with open('data/nifty_sample.csv', 'w') as f:
    f.write('Date,Open,High,Low,Close,Volume\n')
    for p in prices:
        f.write(f"{p['Date']},{p['Open']},{p['High']},{p['Low']},{p['Close']},{p['Volume']}\n")

print(f"Generated {len(prices)} bars for NIFTY from {prices[0]['Date']} to {prices[-1]['Date']}")
