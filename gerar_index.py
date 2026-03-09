import requests

usuario = "AngeloGabrielAlbonetti"

url = f"https://api.github.com/users/{usuario}/repos"
repos = requests.get(url).json()

html_inicio = """<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Meus Projetos</title>
</head>
<body>

<h1>Meus Repositórios</h1>
<ul>
"""

html_repos = ""

for repo in repos:
    nome = repo["name"]
    link = repo["html_url"]

    html_repos += f'<li><a href="{link}" target="_blank">{nome}</a></li>\n'

html_fim = """
</ul>

</body>
</html>
"""

html_final = html_inicio + html_repos + html_fim

with open("index.html", "w", encoding="utf-8") as arquivo:
    arquivo.write(html_final)

print("index.html atualizado com sucesso")