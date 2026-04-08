export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // Health endpoint
    if (path === '/health') {
      return new Response(JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Vessel metadata endpoint
    if (path === '/vessel.json') {
      const metadata = {
        name: "Cocapn Fleet Blueprint",
        version: "1.0.0",
        stats: {
          vessels: 65,
          repositories: 150,
          api_keys: 0,
          open_source: true
        },
        description: "Architecture diagram, integration matrix, and migration guide for Cocapn Fleet",
        last_updated: "2024-01-01"
      };
      return new Response(JSON.stringify(metadata, null, 2), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Main landing page
    if (path === '/') {
      const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cocapn Fleet Blueprint</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Inter', sans-serif;
            background: #0a0a0f;
            color: #e0e0e0;
            line-height: 1.6;
            min-height: 100vh;
        }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .hero {
            padding: 80px 0;
            text-align: center;
            border-bottom: 1px solid #1a1a2e;
        }
        h1 {
            font-size: 3.5rem;
            font-weight: 700;
            background: linear-gradient(90deg, #00E6D6, #00b3a6);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            margin-bottom: 20px;
        }
        .tagline {
            font-size: 1.2rem;
            color: #aaa;
            max-width: 800px;
            margin: 0 auto 40px;
        }
        .section {
            padding: 60px 0;
            border-bottom: 1px solid #1a1a2e;
        }
        h2 {
            font-size: 2.2rem;
            color: #00E6D6;
            margin-bottom: 30px;
            font-weight: 600;
        }
        h3 {
            font-size: 1.5rem;
            color: #fff;
            margin: 25px 0 15px;
            font-weight: 500;
        }
        .architecture {
            display: flex;
            flex-direction: column;
            gap: 15px;
            max-width: 800px;
            margin: 0 auto;
        }
        .layer {
            background: #151520;
            border-left: 4px solid #00E6D6;
            padding: 20px;
            border-radius: 0 8px 8px 0;
            transition: transform 0.2s;
        }
        .layer:hover { transform: translateX(5px); }
        .layer-title {
            font-weight: 600;
            color: #00E6D6;
            margin-bottom: 5px;
        }
        .layer-desc { color: #bbb; font-size: 0.95rem; }
        .matrix {
            overflow-x: auto;
            margin: 30px 0;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            background: #151520;
            border-radius: 8px;
            overflow: hidden;
        }
        th, td {
            padding: 15px;
            text-align: left;
            border-bottom: 1px solid #252535;
        }
        th { background: #1a1a2e; color: #00E6D6; font-weight: 600; }
        tr:hover { background: #1e1e2e; }
        .phase {
            background: #151520;
            padding: 25px;
            border-radius: 8px;
            margin-bottom: 20px;
            border-left: 4px solid #00E6D6;
        }
        .phase h4 { color: #fff; margin-bottom: 10px; }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }
        .stat-card {
            background: #151520;
            padding: 25px;
            border-radius: 8px;
            text-align: center;
            border-top: 3px solid #00E6D6;
        }
        .stat-number {
            font-size: 2.5rem;
            font-weight: 700;
            color: #00E6D6;
            margin-bottom: 10px;
        }
        .stat-label { color: #aaa; }
        .code-block {
            background: #151520;
            padding: 20px;
            border-radius: 8px;
            font-family: monospace;
            color: #00E6D6;
            margin: 20px 0;
            overflow-x: auto;
            border: 1px solid #252535;
        }
        .footer {
            padding: 40px 0;
            text-align: center;
            color: #888;
            font-size: 0.9rem;
        }
        a {
            color: #00E6D6;
            text-decoration: none;
            transition: opacity 0.2s;
        }
        a:hover { opacity: 0.8; }
        .highlight { color: #00E6D6; font-weight: 500; }
        .note {
            background: #1a1a2e;
            padding: 15px;
            border-radius: 6px;
            border-left: 4px solid #ff6b6b;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <section class="hero">
            <h1>Cocapn Fleet Blueprint</h1>
            <p class="tagline">Architecture diagram, integration matrix, and migration guide for the open‑source agent runtime. 65+ vessels, 150+ repos, zero API keys.</p>
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-number">65+</div>
                    <div class="stat-label">Vessels</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">150+</div>
                    <div class="stat-label">Repositories</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">0</div>
                    <div class="stat-label">API Keys</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">100%</div>
                    <div class="stat-label">Open Source</div>
                </div>
            </div>
        </section>

        <section class="section">
            <h2>Architecture Diagram</h2>
            <p>The Cocapn Fleet is structured in six layers, from core runtime to human oversight.</p>
            <div class="architecture">
                <div class="layer">
                    <div class="layer-title">Layer 1: Core</div>
                    <div class="layer-desc">Cocapn runtime – the foundational execution environment for all agents.</div>
                </div>
                <div class="layer">
                    <div class="layer-title">Layer 2: Equipment (12 modules)</div>
                    <div class="layer-desc">Tooling, memory, comms, safety, and other core modules.</div>
                </div>
                <div class="layer">
                    <div class="layer-title">Layer 3: Vessels (65+)</div>
                    <div class="layer-desc">Specialized agent instances each with a defined role and capability set.</div>
                </div>
                <div class="layer">
                    <div class="layer-title">Layer 4: Orchestration</div>
                    <div class="layer-desc">Loop‑closure, epiphany, and workflow coordination across vessels.</div>
                </div>
                <div class="layer">
                    <div class="layer-title">Layer 5: Emergence (13 repos)</div>
                    <div class="layer-desc">Higher‑order behaviors and collective intelligence patterns.</div>
                </div>
                <div class="layer">
                    <div class="layer-title">Layer 6: Admiral (human)</div>
                    <div class="layer-desc">Human‑in‑the‑loop oversight, steering, and final decision rights.</div>
                </div>
            </div>
        </section>

        <section class="section">
            <h2>Integration Matrix</h2>
            <p>Which repositories connect to which components across the fleet.</p>
            <div class="matrix">
                <table>
                    <thead>
                        <tr>
                            <th>Repository</th>
                            <th>Connects To</th>
                            <th>Protocol</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>cocapn‑core</td>
                            <td>All equipment modules</td>
                            <td>gRPC / HTTP</td>
                            <td><span class="highlight">Active</span></td>
                        </tr>
                        <tr>
                            <td>epiphany‑orchestrator</td>
                            <td>65+ vessels, loop‑closure</td>
                            <td>WebSocket</td>
                            <td><span class="highlight">Active</span></td>
                        </tr>
                        <tr>
                            <td>fleet‑memory</td>
                            <td>All vessels, 13 emergence repos</td>
                            <td>GraphQL</td>
                            <td>Beta</td>
                        </tr>
                        <tr>
                            <td>admiral‑dashboard</td>
                            <td>Orchestration layer, human input</td>
                            <td>REST + SSE</td>
                            <td><span class="highlight">Active</span></td>
                        </tr>
                        <tr>
                            <td>safety‑gateway</td>
                            <td>All external comms</td>
                            <td>HTTP middleware</td>
                            <td>Stable</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <section class="section">
            <h2>4‑Phase Roadmap</h2>
            <p>Evolution plan derived from Grok analysis of the agent ecosystem.</p>
            <div class="phase">
                <h4>Phase 1: Consolidation (Now)</h4>
                <p>Unify 150+ repos into a coherent monorepo structure. Standardize communication protocols and data schemas.</p>
            </div>
            <div class="phase">
                <h4>Phase 2: Autonomy (Q2 2024)</h4>
                <p>Enable fully autonomous vessel‑to‑vessel collaboration with loop‑closure and emergent task solving.</p>
            </div>
            <div class="phase">
                <h4>Phase 3: Scale (Q3 2024)</h4>
                <p>Horizontal scaling to 500+ vessels, cross‑fleet memory sharing, and distributed orchestration.</p>
            </div>
            <div class="phase">
                <h4>Phase 4: Admiral AI (Q4 2024)</h4>
                <p>AI‑assisted human oversight, predictive steering, and adaptive fleet‑wide strategy formation.</p>
            </div>
        </section>

        <section class="section">
            <h2>Migration Guide</h2>
            <p>Moving from LangGraph, CrewAI, or AutoGen to Cocapn.</p>
            <h3>Step 1: Install Cocapn</h3>
            <div class="code-block">curl -fsSL https://install.cocapn.ai | bash</div>
            <h3>Step 2: Convert Your Agent Definitions</h3>
            <p>Cocapn uses a declarative YAML format. Convert your existing agents:</p>
            <div class="code-block">cocapn migrate --from langgraph --input agent.json --output vessel.yaml</div>
            <h3>Step 3: Deploy to Fleet</h3>
            <div class="code-block">cocapn fleet deploy vessel.yaml --env production</div>
            <div class="note">
                <strong>Note:</strong> Cocapn is API‑key‑free by design. All communication uses signed, short‑lived tokens.
            </div>
        </section>

        <section class="section">
            <h2>One‑Command Deploy</h2>
            <p>Deploy your own fleet in under 60 seconds.</p>
            <div class="code-block">docker run --rm -p 8080:8080 ghcr.io/lucineer/cocapn-fleet:latest</div>
            <p>Or use the Cloudflare Worker template:</p>
            <div class="code-block">wrangler generate my-fleet https://github.com/Lucineer/cocapn-fleet-worker</div>
            <p>Then deploy:</p>
            <div class="code-block">cd my-fleet && npm run deploy</div>
        </section>

        <footer class="footer">
            <p><i style="color:#888">Built with <a href="https://github.com/Lucineer/cocapn-ai" style="color:#00E6D6">Cocapn</a> — the open‑source agent runtime.</i></p>
            <p style="margin-top: 15px; font-size: 0.8rem;">
                <a href="/health">Health</a> • <a href="/vessel.json">Metadata</a> • <a href="https://github.com/Lucineer/cocapn-ai">GitHub</a> • <a href="https://docs.cocapn.ai">Docs</a>
            </p>
        </footer>
    </div>
</body>
</html>`;
      
      return new Response(html, {
        headers: {
          'Content-Type': 'text/html;charset=UTF-8',
          'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; frame-ancestors 'none'",
          'X-Frame-Options': 'DENY'
        }
      });
    }

    // 404 for other paths
    return new Response('Not Found', { status: 404 });
  }
};