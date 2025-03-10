coords = []
wpos = [-50, -30, -10, 0, 10, 20, 30, 60]

for i in range(8):
	coords.append([(-10, wpos[i]), (110, wpos[i] + 100)])

for i in range(8):
	print(f"@keyframes starry-kf-{i + 1} {{")
	print("    from {")
	print(f"        top: {coords[i][0][0]}vh;")
	print(f"        left: {coords[i][0][1]}vw;")
	print(f"        rotate: 0deg;")
	print("         opacity: 1;")
	print("    }")
	print("    to {")
	print(f"        top: {coords[i][1][0]}vh;")
	print(f"        left: {coords[i][1][1]}vw;")
	print(f"        rotate: 1800deg;")
	print("    }")
	print("}")
