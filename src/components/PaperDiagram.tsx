interface PaperDiagramProps {
  diagramKey: string;
  title: string;
}

const PaperDiagram = ({ diagramKey, title }: PaperDiagramProps) => {
  const renderGraphic = () => {
    switch (diagramKey) {
      case 'attention':
        return (
          <>
            <path d="M52 68 Q160 12 268 68" fill="none" stroke="#cbd5e1" strokeWidth="1.75" />
            <path d="M104 68 Q186 24 268 68" fill="none" stroke="#60a5fa" strokeWidth="2.5" />
            <path d="M158 68 Q213 38 268 68" fill="none" stroke="#93c5fd" strokeWidth="1.75" />
            <path d="M214 68 Q241 48 268 68" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
            {[
              { x: 32, label: 'The', active: false },
              { x: 84, label: 'cat', active: true },
              { x: 138, label: 'sat', active: false },
              { x: 186, label: 'because', active: false, w: 54 },
              { x: 250, label: 'it', active: true, w: 36 },
            ].map((tok) => (
              <g key={tok.label}>
                <rect
                  x={tok.x}
                  y="68"
                  width={tok.w ?? 42}
                  height="22"
                  rx="5"
                  fill={tok.active ? '#1d4ed8' : '#0f172a'}
                />
                <text
                  x={tok.x + (tok.w ?? 42) / 2}
                  y="83"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="10"
                  fontWeight="600"
                >
                  {tok.label}
                </text>
              </g>
            ))}
          </>
        );

      case 'survey':
        return (
          <>
            <text x="160" y="18" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="600">
              Does it really understand?
            </text>
            <line x1="160" y1="26" x2="160" y2="56" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="88" y1="36" x2="232" y2="36" stroke="#94a3b8" strokeWidth="2" />
            <path d="M88 36 L68 62 L108 62 Z" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
            <path d="M68 62 A20 12 0 0 0 108 62 Z" fill="#1e293b" />
            <path d="M232 36 L212 62 L252 62 Z" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
            <path d="M212 62 A20 12 0 0 0 252 62 Z" fill="#2563eb" />
            <text x="88" y="92" textAnchor="middle" fill="#64748b" fontSize="10">
              just patterns?
            </text>
            <text x="232" y="92" textAnchor="middle" fill="#2563eb" fontSize="10" fontWeight="600">
              real reasoning?
            </text>
          </>
        );

      case 'scaling':
        return (
          <>
            <line x1="48" y1="16" x2="48" y2="92" stroke="#cbd5e1" strokeWidth="1.5" />
            <line x1="48" y1="92" x2="280" y2="92" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="58" y="24" fill="#94a3b8" fontSize="9.5" fontWeight="600">
              error
            </text>
            <line x1="72" y1="28" x2="195" y2="62" stroke="#3b82f6" strokeWidth="2.2" />
            <line
              x1="195"
              y1="62"
              x2="262"
              y2="80"
              stroke="#3b82f6"
              strokeWidth="2.2"
              strokeDasharray="4 3"
            />
            {[
              [72, 28],
              [113, 39],
              [154, 51],
              [195, 62],
            ].map(([cx, cy], idx) => (
              <circle key={idx} cx={cx} cy={cy} r="3.5" fill="#3b82f6" />
            ))}
            <circle cx="262" cy="80" r="5" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" />
            <text x="238" y="64" textAnchor="middle" fill="#3b82f6" fontSize="9.5" fontWeight="600">
              forecast
            </text>
          </>
        );

      case 'llama':
        return (
          <>
            <polygon points="88,12 91,19 98,19 92,24 94,31 88,27 82,31 84,24 78,19 85,19" fill="#3b82f6" />
            <rect x="66" y="38" width="44" height="44" rx="8" fill="#1d4ed8" />
            <text x="88" y="64" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="700">
              13B
            </text>
            {[38, 48, 58, 68, 78].map((y, idx) => (
              <rect key={idx} x="118" y={y} width="26" height="6" rx="2" fill="#334155" />
            ))}
            <rect x="184" y="30" width="58" height="52" rx="8" fill="#0f172a" />
            <text x="213" y="60" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="700">
              175B
            </text>
            {[64, 73].map((y, idx) => (
              <rect key={idx} x="250" y={y} width="26" height="6" rx="2" fill="#94a3b8" />
            ))}
          </>
        );

      case 'lora':
        return (
          <>
            <rect x="44" y="20" width="96" height="68" rx="8" fill="#0f172a" />
            <text x="92" y="36" textAnchor="middle" fill="#cbd5e1" fontSize="9" fontWeight="600">
              original weights
            </text>
            <rect x="80" y="52" width="24" height="19" rx="3" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
            <path d="M85 52 V46 A7 7 0 0 1 99 46 V52" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
            <text x="158" y="58" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="700">
              +
            </text>
            <rect x="176" y="20" width="18" height="68" rx="4" fill="#1d4ed8" />
            <text x="185" y="58" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700">
              A
            </text>
            <rect x="200" y="44" width="66" height="20" rx="4" fill="#1e3a8a" />
            <text x="233" y="58" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700">
              B
            </text>
          </>
        );

      case 'constitutional':
        return (
          <>
            <text x="160" y="18" textAnchor="middle" fill="#94a3b8" fontSize="9.5" fontWeight="600">
              principles
            </text>
            <rect x="136" y="24" width="48" height="36" rx="4" fill="#1e3a8a" />
            <line x1="160" y1="24" x2="160" y2="60" stroke="#60a5fa" strokeWidth="1" />
            <line x1="142" y1="34" x2="155" y2="34" stroke="#93c5fd" strokeWidth="1.5" />
            <line x1="142" y1="42" x2="155" y2="42" stroke="#93c5fd" strokeWidth="1.5" />
            <line x1="165" y1="34" x2="178" y2="34" stroke="#93c5fd" strokeWidth="1.5" />
            <line x1="165" y1="42" x2="178" y2="42" stroke="#93c5fd" strokeWidth="1.5" />
            <rect x="34" y="34" width="64" height="28" rx="6" fill="#0f172a" />
            <text x="66" y="52" textAnchor="middle" fill="#ffffff" fontSize="10.5" fontWeight="600">
              draft
            </text>
            <rect x="222" y="34" width="64" height="28" rx="6" fill="#065f46" stroke="#22c55e" strokeWidth="1.5" />
            <text x="254" y="52" textAnchor="middle" fill="#ffffff" fontSize="10.5" fontWeight="600">
              revised
            </text>
            <path d="M254 66 Q160 94 74 66" fill="none" stroke="#3b82f6" strokeWidth="2" />
            <polygon points="70,63 79,63 74,71" fill="#3b82f6" />
          </>
        );

      case 'dpo':
        return (
          <>
            <rect x="26" y="22" width="84" height="26" rx="6" fill="#064e3b" stroke="#22c55e" strokeWidth="1.5" />
            <text x="60" y="39" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="600">
              answer A
            </text>
            <circle cx="96" cy="35" r="6" fill="#22c55e" />
            <path d="M93 35 L95 37 L99 33" fill="none" stroke="#ffffff" strokeWidth="1.5" />

            <rect x="26" y="64" width="84" height="26" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
            <text x="60" y="81" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="600">
              answer B
            </text>
            <circle cx="96" cy="77" r="6" fill="#ef4444" />
            <path d="M93.5 74.5 L98.5 79.5 M98.5 74.5 L93.5 79.5" stroke="#ffffff" strokeWidth="1.5" />

            <rect x="130" y="14" width="66" height="22" rx="4" fill="#334155" />
            <text x="163" y="28" textAnchor="middle" fill="#e2e8f0" fontSize="8.5">
              reward model
            </text>
            <line x1="126" y1="36" x2="200" y2="14" stroke="#ef4444" strokeWidth="2" />

            <rect x="218" y="36" width="68" height="44" rx="8" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="252" y="62" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700">
              model
            </text>

            <line x1="112" y1="36" x2="214" y2="52" stroke="#3b82f6" strokeWidth="2" />
            <line x1="112" y1="76" x2="214" y2="66" stroke="#3b82f6" strokeWidth="1.5" />
          </>
        );

      case 'react':
        return (
          <>
            <circle cx="110" cy="30" r="21" fill="#1d4ed8" />
            <text x="110" y="34" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="700">
              Think
            </text>
            <circle cx="212" cy="30" r="21" fill="#1d4ed8" />
            <text x="212" y="34" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="700">
              Act
            </text>
            <circle cx="161" cy="78" r="22" fill="#0f172a" />
            <text x="161" y="82" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="700">
              Observe
            </text>
            <line x1="133" y1="30" x2="188" y2="30" stroke="#3b82f6" strokeWidth="2" />
            <polygon points="184,26 191,30 184,34" fill="#3b82f6" />
            <line x1="201" y1="49" x2="177" y2="68" stroke="#3b82f6" strokeWidth="2" />
            <line x1="145" y1="68" x2="121" y2="49" stroke="#3b82f6" strokeWidth="2" />
            <text x="242" y="64" fill="#64748b" fontSize="9">
              e.g. search
            </text>
            <text x="58" y="76" fill="#64748b" fontSize="9">
              read result
            </text>
          </>
        );

      case 'toolformer':
        return (
          <>
            <rect x="24" y="18" width="272" height="26" rx="5" fill="#0f172a" />
            <text x="52" y="35" fill="#e2e8f0" fontSize="9.5" fontFamily="monospace">
              50÷8 is
            </text>
            <rect x="102" y="22" width="112" height="18" rx="3" fill="#1e3a8a" />
            <text x="158" y="34" textAnchor="middle" fill="#93c5fd" fontSize="9" fontFamily="monospace">
              [Calc(50/8) → 6.25]
            </text>
            <text x="248" y="35" fill="#ffffff" fontSize="9.5" fontFamily="monospace">
              6.25
            </text>
            {[
              { x: 76, label: 'calculator', glyph: '⊞' },
              { x: 160, label: 'search', glyph: '⌕' },
              { x: 244, label: 'calendar', glyph: '▦' },
            ].map((item) => (
              <g key={item.label}>
                <rect x={item.x - 14} y="56" width="28" height="24" rx="5" fill="#1e293b" />
                <text x={item.x} y="72" textAnchor="middle" fill="#93c5fd" fontSize="13">
                  {item.glyph}
                </text>
                <text x={item.x} y="94" textAnchor="middle" fill="#64748b" fontSize="9">
                  {item.label}
                </text>
              </g>
            ))}
          </>
        );

      case 'reflexion':
        return (
          <>
            <rect x="34" y="22" width="56" height="46" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
            <text x="62" y="39" textAnchor="middle" fill="#fca5a5" fontSize="9.5" fontWeight="600">
              try 1
            </text>
            <path d="M56 46 L68 58 M68 46 L56 58" stroke="#f87171" strokeWidth="2.5" />

            <line x1="92" y1="45" x2="122" y2="45" stroke="#3b82f6" strokeWidth="2" />

            <rect x="124" y="18" width="68" height="54" rx="6" fill="#1e3a8a" />
            {[30, 39, 48, 57].map((y, idx) => (
              <line key={idx} x1="134" y1={y} x2="182" y2={y} stroke="#93c5fd" strokeWidth="2" />
            ))}
            <text x="158" y="88" textAnchor="middle" fill="#3b82f6" fontSize="9.5" fontWeight="600">
              note to self
            </text>

            <line x1="194" y1="45" x2="224" y2="45" stroke="#3b82f6" strokeWidth="2" />

            <rect x="226" y="22" width="56" height="46" rx="6" fill="#064e3b" stroke="#22c55e" strokeWidth="1.5" />
            <text x="254" y="39" textAnchor="middle" fill="#86efac" fontSize="9.5" fontWeight="600">
              try 2
            </text>
            <path d="M246 53 L252 59 L264 47" fill="none" stroke="#4ade80" strokeWidth="2.5" />
          </>
        );

      case 'swe-agent':
        return (
          <>
            <rect x="34" y="34" width="36" height="36" rx="8" fill="#1d4ed8" />
            <circle cx="45" cy="48" r="3" fill="#ffffff" />
            <circle cx="59" cy="48" r="3" fill="#ffffff" />
            <rect x="44" y="58" width="16" height="3" rx="1.5" fill="#93c5fd" />
            <line x1="74" y1="52" x2="104" y2="52" stroke="#3b82f6" strokeWidth="2" />
            <polygon points="100,48 107,52 100,56" fill="#3b82f6" />
            <rect x="110" y="16" width="184" height="76" rx="8" fill="#0f172a" />
            <text x="122" y="34" fill="#cbd5e1" fontSize="9.5" fontFamily="monospace">
              $ find_file utils.py
            </text>
            <text x="122" y="50" fill="#cbd5e1" fontSize="9.5" fontFamily="monospace">
              $ open utils.py 40
            </text>
            <text x="122" y="66" fill="#cbd5e1" fontSize="9.5" fontFamily="monospace">
              $ edit 42:44
            </text>
            <text x="122" y="82" fill="#4ade80" fontSize="9.5" fontFamily="monospace">
              $ run tests ✓
            </text>
          </>
        );

      case 'llm-judge':
        return (
          <>
            <rect x="30" y="20" width="76" height="24" rx="5" fill="#0f172a" />
            <text x="68" y="36" textAnchor="middle" fill="#ffffff" fontSize="9.5" fontWeight="600">
              answer A
            </text>
            <rect x="30" y="62" width="76" height="24" rx="5" fill="#0f172a" />
            <text x="68" y="78" textAnchor="middle" fill="#ffffff" fontSize="9.5" fontWeight="600">
              answer B
            </text>
            <line x1="108" y1="32" x2="132" y2="48" stroke="#60a5fa" strokeWidth="2" />
            <line x1="108" y1="74" x2="132" y2="58" stroke="#60a5fa" strokeWidth="2" />
            <rect x="134" y="32" width="56" height="42" rx="8" fill="#1e3a8a" />
            <text x="162" y="50" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="700">
              LLM
            </text>
            <text x="162" y="64" textAnchor="middle" fill="#bfdbfe" fontSize="10">
              judge
            </text>
            <line x1="192" y1="53" x2="216" y2="53" stroke="#60a5fa" strokeWidth="2" />
            <rect x="218" y="39" width="74" height="28" rx="6" fill="#064e3b" stroke="#22c55e" strokeWidth="1.5" />
            <text x="255" y="57" textAnchor="middle" fill="#ffffff" fontSize="10.5" fontWeight="700">
              A wins
            </text>
          </>
        );

      case 'swe-bench':
        return (
          <>
            <rect x="24" y="16" width="80" height="72" rx="7" fill="#0f172a" />
            <circle cx="38" cy="30" r="4" fill="none" stroke="#22c55e" strokeWidth="1.5" />
            {[42, 52, 62, 72].map((y, idx) => (
              <line key={idx} x1="34" y1={y} x2="90" y2={y} stroke="#475569" strokeWidth="2.5" />
            ))}
            <text x="64" y="102" textAnchor="middle" fill="#64748b" fontSize="9">
              real issue
            </text>

            <rect x="120" y="16" width="80" height="72" rx="7" fill="#0f172a" />
            <rect x="128" y="26" width="64" height="12" rx="2" fill="#7f1d1d" />
            <text x="133" y="35" fill="#fca5a5" fontSize="9">
              -
            </text>
            <rect x="128" y="42" width="64" height="12" rx="2" fill="#14532d" />
            <text x="133" y="51" fill="#86efac" fontSize="9">
              +
            </text>
            <rect x="128" y="58" width="64" height="12" rx="2" fill="#14532d" />
            <text x="133" y="67" fill="#86efac" fontSize="9">
              +
            </text>
            <text x="160" y="102" textAnchor="middle" fill="#64748b" fontSize="9">
              model's fix
            </text>

            <rect x="216" y="16" width="80" height="72" rx="7" fill="#0f172a" stroke="#2563eb" strokeWidth="1.5" />
            {[32, 50, 68].map((y, idx) => (
              <g key={idx}>
                <path
                  d={`M228 ${y} L232 ${y + 4} L239 ${y - 4}`}
                  fill="none"
                  stroke="#4ade80"
                  strokeWidth="2"
                />
                <line x1="246" y1={y} x2="282" y2={y} stroke="#334155" strokeWidth="2.5" />
              </g>
            ))}
            <text x="256" y="102" textAnchor="middle" fill="#64748b" fontSize="9">
              hidden tests
            </text>
          </>
        );

      case 'tau-bench':
        return (
          <>
            <rect x="26" y="16" width="114" height="22" rx="11" fill="#0f172a" />
            <text x="83" y="30" textAnchor="middle" fill="#ffffff" fontSize="9.5" fontWeight="600">
              change my flight?
            </text>
            <rect x="52" y="44" width="128" height="22" rx="11" fill="#1d4ed8" />
            <text x="116" y="58" textAnchor="middle" fill="#ffffff" fontSize="9.5" fontWeight="600">
              checking the policy
            </text>
            <rect x="200" y="18" width="38" height="44" rx="5" fill="#1e293b" />
            {[28, 36, 44].map((y, idx) => (
              <line key={idx} x1="208" y1={y} x2="230" y2={y} stroke="#94a3b8" strokeWidth="2" />
            ))}
            <rect x="248" y="20" width="42" height="42" rx="6" fill="#0f172a" />
            <ellipse cx="269" cy="24" rx="18" ry="5" fill="#334155" />
            <text x="112" y="92" textAnchor="middle" fill="#64748b" fontSize="9">
              4 tries (pass^k):
            </text>
            <circle cx="178" cy="89" r="5" fill="#22c55e" />
            <circle cx="194" cy="89" r="5" fill="#ef4444" />
            <circle cx="210" cy="89" r="5" fill="#22c55e" />
            <circle cx="226" cy="89" r="5" fill="#22c55e" />
          </>
        );

      case 'gaia':
        return (
          <>
            <text x="108" y="18" textAnchor="middle" fill="#16a34a" fontSize="11" fontWeight="700">
              92%
            </text>
            <rect x="84" y="24" width="48" height="62" rx="4" fill="#064e3b" stroke="#22c55e" strokeWidth="1.5" />
            <text x="108" y="102" textAnchor="middle" fill="#64748b" fontSize="9.5">
              humans
            </text>

            <text x="212" y="68" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="700">
              15%
            </text>
            <rect x="188" y="74" width="48" height="12" rx="3" fill="#334155" />
            <text x="212" y="102" textAnchor="middle" fill="#64748b" fontSize="9.5">
              GPT-4 + plugins
            </text>
          </>
        );

      case 'self-correct':
        return (
          <>
            <rect x="112" y="14" width="96" height="24" rx="6" fill="#0f172a" />
            <text x="160" y="30" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="600">
              check yourself
            </text>

            <rect x="28" y="48" width="76" height="36" rx="6" fill="#064e3b" stroke="#22c55e" strokeWidth="1.5" />
            <text x="66" y="63" textAnchor="middle" fill="#ffffff" fontSize="9.5" fontWeight="600">
              answer
            </text>
            <path d="M59 71 L64 76 L73 67" fill="none" stroke="#4ade80" strokeWidth="2" />

            <line x1="106" y1="66" x2="138" y2="66" stroke="#3b82f6" strokeWidth="2" />
            <circle cx="160" cy="66" r="16" fill="#1e3a8a" />
            <text x="160" y="70" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="700">
              ?
            </text>
            <line x1="182" y1="66" x2="212" y2="66" stroke="#ef4444" strokeWidth="2" />

            <rect x="216" y="48" width="76" height="36" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
            <text x="254" y="63" textAnchor="middle" fill="#ffffff" fontSize="9.5" fontWeight="600">
              changed
            </text>
            <path d="M249 69 L259 79 M259 69 L249 79" stroke="#f87171" strokeWidth="2" />
          </>
        );

      case 'cache-poison':
        return (
          <>
            <text x="72" y="18" textAnchor="middle" fill="#64748b" fontSize="9">
              attacker's look-alike
            </text>
            <rect x="22" y="24" width="114" height="22" rx="5" fill="#0f172a" />
            <text x="64" y="38" textAnchor="middle" fill="#e2e8f0" fontSize="8.5">
              reset password
            </text>
            <rect x="104" y="27" width="26" height="16" rx="3" fill="#991b1b" />
            <text x="117" y="38" textAnchor="middle" fill="#ffffff" fontSize="8.5">
              +...
            </text>

            <text x="68" y="62" textAnchor="middle" fill="#64748b" fontSize="9">
              your question
            </text>
            <rect x="22" y="68" width="104" height="22" rx="5" fill="#0f172a" />
            <text x="74" y="83" textAnchor="middle" fill="#ffffff" fontSize="9">
              reset password?
            </text>

            <rect x="174" y="16" width="120" height="72" rx="7" fill="#0f172a" />
            <text x="234" y="31" textAnchor="middle" fill="#94a3b8" fontSize="9">
              answer cache
            </text>
            <rect x="184" y="37" width="100" height="12" rx="3" fill="#1e293b" />
            <rect x="184" y="54" width="100" height="18" rx="3" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1" />
            <text x="234" y="66" textAnchor="middle" fill="#fecaca" fontSize="8.5" fontWeight="600">
              bad answer
            </text>

            <line x1="138" y1="36" x2="182" y2="60" stroke="#ef4444" strokeWidth="1.8" />
            <line x1="182" y1="64" x2="128" y2="79" stroke="#ef4444" strokeWidth="1.8" />
          </>
        );

      case 'adam':
        return (
          <>
            <path d="M36 28 C92 18, 122 86, 174 82 C214 78, 232 54, 276 80" fill="none" stroke="#94a3b8" strokeWidth="1.8" strokeDasharray="3 3" />
            <path d="M36 28 Q134 52 276 80" fill="none" stroke="#2563eb" strokeWidth="2.5" />
            <circle cx="36" cy="28" r="5" fill="#0f172a" />
            <text x="48" y="24" fill="#64748b" fontSize="9.5" fontWeight="600">
              start
            </text>
            <circle cx="276" cy="80" r="6" fill="#22c55e" stroke="#ffffff" strokeWidth="1.5" />
            <text x="266" y="66" textAnchor="end" fill="#15803d" fontSize="9.5" fontWeight="600">
              adaptive steps (m, v)
            </text>
          </>
        );

      case 'resnet':
      default:
        return (
          <>
            <path d="M54 56 Q160 8 266 56" fill="none" stroke="#2563eb" strokeWidth="2.5" />
            <polygon points="261,51 270,57 259,59" fill="#2563eb" />
            <text x="160" y="24" textAnchor="middle" fill="#2563eb" fontSize="10" fontWeight="700">
              shortcut (+x)
            </text>
            <rect x="40" y="54" width="38" height="28" rx="6" fill="#0f172a" />
            <text x="59" y="72" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="600">
              x
            </text>
            <rect x="114" y="52" width="92" height="32" rx="6" fill="#1e293b" />
            <text x="160" y="72" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontWeight="600">
              layers F(x)
            </text>
            <circle cx="272" cy="68" r="14" fill="#064e3b" stroke="#22c55e" strokeWidth="1.5" />
            <text x="272" y="72" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700">
              +
            </text>
            <line x1="78" y1="68" x2="112" y2="68" stroke="#64748b" strokeWidth="2" />
            <line x1="206" y1="68" x2="256" y2="68" stroke="#64748b" strokeWidth="2" />
          </>
        );
    }
  };

  return (
    <svg
      viewBox="0 0 320 108"
      role="img"
      aria-label={`${title} concept diagram`}
      className="paper-diagram-svg"
    >
      {renderGraphic()}
    </svg>
  );
};

export default PaperDiagram;
