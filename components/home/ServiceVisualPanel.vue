<script setup lang="ts">
defineProps<{
  serviceKey: string;
}>();
</script>

<template>
  <div class="visual-frame" aria-hidden="true">
    <!-- ── WEBSITES: Browser + landing page mockup ── -->
    <svg
      v-if="serviceKey === 'websites'"
      viewBox="0 0 460 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="visual-svg"
    >
      <!-- Card backing -->
      <rect
        x="16"
        y="16"
        width="428"
        height="328"
        rx="18"
        fill="rgba(15,7,3,0.70)"
        stroke="rgba(255,255,255,0.09)"
        stroke-width="1"
      />
      <!-- Subtle grid -->
      <line
        x1="16"
        y1="130"
        x2="444"
        y2="130"
        stroke="rgba(255,255,255,0.03)"
        stroke-width="1"
      />
      <line
        x1="16"
        y1="240"
        x2="444"
        y2="240"
        stroke="rgba(255,255,255,0.03)"
        stroke-width="1"
      />
      <line
        x1="152"
        y1="16"
        x2="152"
        y2="344"
        stroke="rgba(255,255,255,0.03)"
        stroke-width="1"
      />
      <line
        x1="308"
        y1="16"
        x2="308"
        y2="344"
        stroke="rgba(255,255,255,0.03)"
        stroke-width="1"
      />

      <!-- Browser window -->
      <rect
        x="36"
        y="36"
        width="388"
        height="282"
        rx="12"
        fill="rgba(255,255,255,0.03)"
        stroke="rgba(255,255,255,0.10)"
        stroke-width="1"
      />
      <!-- Chrome bar -->
      <rect
        x="36"
        y="36"
        width="388"
        height="34"
        rx="12"
        fill="rgba(255,255,255,0.06)"
      />
      <rect
        x="36"
        y="54"
        width="388"
        height="16"
        fill="rgba(255,255,255,0.06)"
      />
      <!-- Traffic lights -->
      <circle cx="58" cy="53" r="5" fill="rgba(255,80,80,0.55)" />
      <circle cx="74" cy="53" r="5" fill="rgba(255,190,50,0.45)" />
      <circle cx="90" cy="53" r="5" fill="rgba(80,200,80,0.40)" />
      <!-- URL bar -->
      <rect
        x="112"
        y="43"
        width="232"
        height="20"
        rx="10"
        fill="rgba(255,255,255,0.06)"
        stroke="rgba(255,255,255,0.11)"
        stroke-width="0.75"
      />
      <text
        x="228"
        y="57"
        text-anchor="middle"
        fill="rgba(255,255,255,0.30)"
        font-size="9"
        font-family="system-ui,sans-serif"
      >
        eyeonidea.com
      </text>

      <!-- Hero band -->
      <rect
        x="50"
        y="82"
        width="360"
        height="90"
        rx="6"
        fill="rgba(223,175,133,0.10)"
        stroke="rgba(223,175,133,0.15)"
        stroke-width="0.75"
      />
      <!-- Headline -->
      <rect
        x="68"
        y="104"
        width="148"
        height="10"
        rx="5"
        fill="rgba(255,255,255,0.65)"
      />
      <rect
        x="68"
        y="120"
        width="110"
        height="7"
        rx="3.5"
        fill="rgba(255,255,255,0.28)"
      />
      <!-- CTA -->
      <rect x="68" y="137" width="80" height="24" rx="8" fill="#dfaf85" />
      <text
        x="108"
        y="153"
        text-anchor="middle"
        fill="rgba(30,12,4,0.90)"
        font-size="8.5"
        font-weight="700"
        font-family="system-ui,sans-serif"
      >
        Explore →
      </text>
      <!-- Hero image suggestion -->
      <rect
        x="300"
        y="86"
        width="106"
        height="82"
        rx="5"
        fill="rgba(100,198,183,0.10)"
        stroke="rgba(100,198,183,0.18)"
        stroke-width="0.75"
      />

      <!-- Nav strip -->
      <line
        x1="50"
        y1="188"
        x2="410"
        y2="188"
        stroke="rgba(255,255,255,0.07)"
        stroke-width="0.75"
      />
      <rect
        x="68"
        y="196"
        width="48"
        height="5.5"
        rx="2.75"
        fill="rgba(255,255,255,0.35)"
      />
      <rect
        x="128"
        y="196"
        width="48"
        height="5.5"
        rx="2.75"
        fill="rgba(255,255,255,0.16)"
      />
      <rect
        x="188"
        y="196"
        width="48"
        height="5.5"
        rx="2.75"
        fill="rgba(255,255,255,0.16)"
      />
      <rect
        x="248"
        y="196"
        width="48"
        height="5.5"
        rx="2.75"
        fill="rgba(255,255,255,0.16)"
      />

      <!-- Content cards row -->
      <rect
        x="50"
        y="214"
        width="110"
        height="62"
        rx="6"
        fill="rgba(255,255,255,0.03)"
        stroke="rgba(255,255,255,0.08)"
        stroke-width="0.5"
      />
      <rect
        x="60"
        y="224"
        width="68"
        height="6"
        rx="3"
        fill="rgba(255,255,255,0.32)"
      />
      <rect
        x="60"
        y="236"
        width="84"
        height="4.5"
        rx="2.25"
        fill="rgba(255,255,255,0.14)"
      />
      <rect
        x="60"
        y="246"
        width="72"
        height="4.5"
        rx="2.25"
        fill="rgba(255,255,255,0.10)"
      />

      <rect
        x="175"
        y="214"
        width="110"
        height="62"
        rx="6"
        fill="rgba(255,255,255,0.03)"
        stroke="rgba(255,255,255,0.08)"
        stroke-width="0.5"
      />
      <rect
        x="185"
        y="224"
        width="68"
        height="6"
        rx="3"
        fill="rgba(255,255,255,0.32)"
      />
      <rect
        x="185"
        y="236"
        width="84"
        height="4.5"
        rx="2.25"
        fill="rgba(255,255,255,0.14)"
      />
      <rect
        x="185"
        y="246"
        width="72"
        height="4.5"
        rx="2.25"
        fill="rgba(255,255,255,0.10)"
      />

      <rect
        x="300"
        y="214"
        width="110"
        height="62"
        rx="6"
        fill="rgba(255,255,255,0.03)"
        stroke="rgba(255,255,255,0.08)"
        stroke-width="0.5"
      />
      <rect
        x="310"
        y="224"
        width="68"
        height="6"
        rx="3"
        fill="rgba(255,255,255,0.32)"
      />
      <rect
        x="310"
        y="236"
        width="84"
        height="4.5"
        rx="2.25"
        fill="rgba(255,255,255,0.14)"
      />
      <rect
        x="310"
        y="246"
        width="72"
        height="4.5"
        rx="2.25"
        fill="rgba(255,255,255,0.10)"
      />

      <!-- PageSpeed badge -->
      <rect
        x="320"
        y="294"
        width="104"
        height="34"
        rx="10"
        fill="rgba(100,198,183,0.12)"
        stroke="#64c6b7"
        stroke-width="0.75"
      />
      <circle cx="337" cy="311" r="4" fill="#64c6b7" opacity="0.7" />
      <text
        x="395"
        y="316"
        text-anchor="end"
        fill="#64c6b7"
        font-size="12"
        font-weight="700"
        font-family="system-ui,sans-serif"
      >
        98 / 100
      </text>
    </svg>

    <!-- ── IDENTITY: Brand mark + palette + type ── -->
    <svg
      v-else-if="serviceKey === 'identity'"
      viewBox="0 0 460 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="visual-svg"
    >
      <rect
        x="16"
        y="16"
        width="428"
        height="328"
        rx="18"
        fill="rgba(15,7,3,0.70)"
        stroke="rgba(255,255,255,0.09)"
        stroke-width="1"
      />

      <!-- Wordmark label top -->
      <text
        x="230"
        y="52"
        text-anchor="middle"
        fill="rgba(255,255,255,0.22)"
        font-size="9"
        font-family="system-ui,sans-serif"
        letter-spacing="0.20em"
      >
        VISUAL IDENTITY SYSTEM
      </text>

      <!-- Central geometric mark -->
      <g transform="translate(230,178)">
        <!-- Outer orbit ring -->
        <circle
          cx="0"
          cy="0"
          r="74"
          fill="none"
          stroke="rgba(223,175,133,0.14)"
          stroke-width="1"
          stroke-dasharray="4 4"
        />
        <!-- Mid ring -->
        <circle
          cx="0"
          cy="0"
          r="52"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          stroke-width="0.75"
        />
        <!-- Diamond outer -->
        <polygon
          points="0,-52 38,0 0,52 -38,0"
          fill="rgba(223,175,133,0.06)"
          stroke="#dfaf85"
          stroke-width="1.5"
        />
        <!-- Diamond inner -->
        <polygon
          points="0,-30 22,0 0,30 -22,0"
          fill="rgba(223,175,133,0.10)"
          stroke="rgba(223,175,133,0.50)"
          stroke-width="1"
        />
        <!-- Center gem -->
        <circle cx="0" cy="0" r="7" fill="#dfaf85" opacity="0.85" />
        <circle cx="0" cy="0" r="12" fill="rgba(223,175,133,0.20)" />
        <!-- Cardinal ticks -->
        <line
          x1="0"
          y1="-74"
          x2="0"
          y2="-55"
          stroke="rgba(223,175,133,0.22)"
          stroke-width="0.75"
        />
        <line
          x1="0"
          y1=" 55"
          x2="0"
          y2=" 74"
          stroke="rgba(223,175,133,0.22)"
          stroke-width="0.75"
        />
        <line
          x1="-74"
          y1="0"
          x2="-55"
          y2="0"
          stroke="rgba(223,175,133,0.22)"
          stroke-width="0.75"
        />
        <line
          x1=" 55"
          y1="0"
          x2=" 74"
          y2="0"
          stroke="rgba(223,175,133,0.22)"
          stroke-width="0.75"
        />
      </g>

      <!-- Brand name below mark -->
      <text
        x="230"
        y="278"
        text-anchor="middle"
        fill="rgba(255,255,255,0.72)"
        font-size="15"
        font-weight="300"
        font-family="system-ui,sans-serif"
        letter-spacing="0.18em"
      >
        EYE ON IDEA
      </text>

      <!-- Color palette strip -->
      <g transform="translate(96,306)">
        <rect x="0" y="0" width="46" height="20" rx="5" fill="#1f0f06" />
        <rect x="54" y="0" width="46" height="20" rx="5" fill="#3a2010" />
        <rect x="108" y="0" width="46" height="20" rx="5" fill="#dfaf85" />
        <rect x="162" y="0" width="46" height="20" rx="5" fill="#64c6b7" />
        <rect
          x="216"
          y="0"
          width="46"
          height="20"
          rx="5"
          fill="rgba(255,255,255,0.80)"
        />
        <!-- Borders -->
        <rect
          x="0"
          y="0"
          width="46"
          height="20"
          rx="5"
          fill="none"
          stroke="rgba(255,255,255,0.13)"
          stroke-width="0.75"
        />
        <rect
          x="54"
          y="0"
          width="46"
          height="20"
          rx="5"
          fill="none"
          stroke="rgba(255,255,255,0.13)"
          stroke-width="0.75"
        />
        <rect
          x="108"
          y="0"
          width="46"
          height="20"
          rx="5"
          fill="none"
          stroke="rgba(255,255,255,0.13)"
          stroke-width="0.75"
        />
        <rect
          x="162"
          y="0"
          width="46"
          height="20"
          rx="5"
          fill="none"
          stroke="rgba(255,255,255,0.13)"
          stroke-width="0.75"
        />
        <rect
          x="216"
          y="0"
          width="46"
          height="20"
          rx="5"
          fill="none"
          stroke="rgba(255,255,255,0.13)"
          stroke-width="0.75"
        />
      </g>
    </svg>

    <!-- ── CONTENT: Article card mockup ── -->
    <svg
      v-else-if="serviceKey === 'content'"
      viewBox="0 0 460 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="visual-svg"
    >
      <rect
        x="16"
        y="16"
        width="428"
        height="328"
        rx="18"
        fill="rgba(15,7,3,0.70)"
        stroke="rgba(255,255,255,0.09)"
        stroke-width="1"
      />

      <!-- Featured image area -->
      <rect
        x="32"
        y="32"
        width="396"
        height="118"
        rx="10"
        fill="rgba(223,175,133,0.08)"
        stroke="rgba(223,175,133,0.16)"
        stroke-width="0.75"
      />
      <!-- Landscape horizon lines (image suggestion) -->
      <line
        x1="32"
        y1="120"
        x2="160"
        y2="76"
        stroke="rgba(223,175,133,0.16)"
        stroke-width="0.75"
      />
      <line
        x1="160"
        y1="76"
        x2="268"
        y2="104"
        stroke="rgba(223,175,133,0.16)"
        stroke-width="0.75"
      />
      <line
        x1="268"
        y1="104"
        x2="378"
        y2="60"
        stroke="rgba(223,175,133,0.16)"
        stroke-width="0.75"
      />
      <line
        x1="378"
        y1="60"
        x2="428"
        y2="88"
        stroke="rgba(223,175,133,0.16)"
        stroke-width="0.75"
      />
      <!-- Sun dot -->
      <circle
        cx="372"
        cy="58"
        r="10"
        fill="rgba(223,175,133,0.18)"
        stroke="rgba(223,175,133,0.28)"
        stroke-width="0.75"
      />

      <!-- Category pill -->
      <rect
        x="32"
        y="164"
        width="64"
        height="19"
        rx="9.5"
        fill="rgba(100,198,183,0.13)"
        stroke="rgba(100,198,183,0.32)"
        stroke-width="0.75"
      />
      <text
        x="64"
        y="177.5"
        text-anchor="middle"
        fill="#64c6b7"
        font-size="7.5"
        font-weight="600"
        font-family="system-ui,sans-serif"
        letter-spacing="0.10em"
      >
        INSIGHT
      </text>

      <!-- Article headline -->
      <rect
        x="32"
        y="192"
        width="350"
        height="11"
        rx="5.5"
        fill="rgba(255,255,255,0.68)"
      />
      <rect
        x="32"
        y="210"
        width="290"
        height="11"
        rx="5.5"
        fill="rgba(255,255,255,0.52)"
      />

      <!-- Body copy lines -->
      <rect
        x="32"
        y="234"
        width="396"
        height="5.5"
        rx="2.75"
        fill="rgba(255,255,255,0.20)"
      />
      <rect
        x="32"
        y="246"
        width="378"
        height="5.5"
        rx="2.75"
        fill="rgba(255,255,255,0.15)"
      />
      <rect
        x="32"
        y="258"
        width="330"
        height="5.5"
        rx="2.75"
        fill="rgba(255,255,255,0.12)"
      />

      <!-- Divider -->
      <line
        x1="32"
        y1="278"
        x2="428"
        y2="278"
        stroke="rgba(255,255,255,0.07)"
        stroke-width="0.75"
      />

      <!-- Author row -->
      <circle
        cx="48"
        cy="298"
        r="11"
        fill="rgba(223,175,133,0.18)"
        stroke="rgba(223,175,133,0.30)"
        stroke-width="0.75"
      />
      <rect
        x="66"
        y="292"
        width="64"
        height="5.5"
        rx="2.75"
        fill="rgba(255,255,255,0.38)"
      />
      <rect
        x="66"
        y="302"
        width="48"
        height="4.5"
        rx="2.25"
        fill="rgba(255,255,255,0.18)"
      />

      <!-- Share + read time right -->
      <rect
        x="330"
        y="291"
        width="66"
        height="5.5"
        rx="2.75"
        fill="rgba(255,255,255,0.20)"
      />
      <rect
        x="330"
        y="302"
        width="50"
        height="4.5"
        rx="2.25"
        fill="rgba(255,255,255,0.12)"
      />

      <!-- Tags -->
      <rect
        x="32"
        y="318"
        width="58"
        height="16"
        rx="8"
        fill="rgba(255,255,255,0.05)"
        stroke="rgba(255,255,255,0.12)"
        stroke-width="0.5"
      />
      <text
        x="61"
        y="330"
        text-anchor="middle"
        fill="rgba(255,255,255,0.35)"
        font-size="7"
        font-family="system-ui,sans-serif"
      >
        B2B
      </text>
      <rect
        x="98"
        y="318"
        width="72"
        height="16"
        rx="8"
        fill="rgba(255,255,255,0.05)"
        stroke="rgba(255,255,255,0.12)"
        stroke-width="0.5"
      />
      <text
        x="134"
        y="330"
        text-anchor="middle"
        fill="rgba(255,255,255,0.35)"
        font-size="7"
        font-family="system-ui,sans-serif"
      >
        Strategy
      </text>
      <rect
        x="178"
        y="318"
        width="72"
        height="16"
        rx="8"
        fill="rgba(255,255,255,0.05)"
        stroke="rgba(255,255,255,0.12)"
        stroke-width="0.5"
      />
      <text
        x="214"
        y="330"
        text-anchor="middle"
        fill="rgba(255,255,255,0.35)"
        font-size="7"
        font-family="system-ui,sans-serif"
      >
        Content
      </text>
    </svg>

    <!-- ── SEO: Rank chart + keyword cluster ── -->
    <svg
      v-else-if="serviceKey === 'seo'"
      viewBox="0 0 460 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="visual-svg"
    >
      <defs>
        <linearGradient id="seo-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#64c6b7" stop-opacity="0.45" />
          <stop offset="100%" stop-color="#64c6b7" stop-opacity="0" />
        </linearGradient>
      </defs>
      <rect
        x="16"
        y="16"
        width="428"
        height="328"
        rx="18"
        fill="rgba(15,7,3,0.70)"
        stroke="rgba(255,255,255,0.09)"
        stroke-width="1"
      />

      <!-- Axis labels -->
      <text
        x="50"
        y="60"
        text-anchor="end"
        fill="rgba(255,255,255,0.22)"
        font-size="8"
        font-family="system-ui,sans-serif"
      >
        #1
      </text>
      <text
        x="50"
        y="100"
        text-anchor="end"
        fill="rgba(255,255,255,0.22)"
        font-size="8"
        font-family="system-ui,sans-serif"
      >
        #3
      </text>
      <text
        x="50"
        y="140"
        text-anchor="end"
        fill="rgba(255,255,255,0.22)"
        font-size="8"
        font-family="system-ui,sans-serif"
      >
        #6
      </text>
      <text
        x="50"
        y="180"
        text-anchor="end"
        fill="rgba(255,255,255,0.22)"
        font-size="8"
        font-family="system-ui,sans-serif"
      >
        #10
      </text>
      <text
        x="50"
        y="220"
        text-anchor="end"
        fill="rgba(255,255,255,0.22)"
        font-size="8"
        font-family="system-ui,sans-serif"
      >
        #20
      </text>

      <!-- Grid lines -->
      <line
        x1="58"
        y1="56"
        x2="428"
        y2="56"
        stroke="rgba(255,255,255,0.05)"
        stroke-width="0.75"
      />
      <line
        x1="58"
        y1="96"
        x2="428"
        y2="96"
        stroke="rgba(255,255,255,0.05)"
        stroke-width="0.75"
      />
      <line
        x1="58"
        y1="136"
        x2="428"
        y2="136"
        stroke="rgba(255,255,255,0.05)"
        stroke-width="0.75"
      />
      <line
        x1="58"
        y1="176"
        x2="428"
        y2="176"
        stroke="rgba(255,255,255,0.05)"
        stroke-width="0.75"
      />
      <line
        x1="58"
        y1="216"
        x2="428"
        y2="216"
        stroke="rgba(255,255,255,0.05)"
        stroke-width="0.75"
      />

      <!-- Trend area -->
      <polygon
        points="70,210 130,195 185,172 235,148 280,118 330,88 385,64 428,56 428,220 70,220"
        fill="url(#seo-area)"
      />
      <!-- Trend line -->
      <polyline
        points="70,210 130,195 185,172 235,148 280,118 330,88 385,64 428,56"
        stroke="#64c6b7"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <!-- Endpoint glow -->
      <circle cx="428" cy="56" r="5" fill="#64c6b7" />
      <circle cx="428" cy="56" r="10" fill="rgba(100,198,183,0.25)" />
      <!-- Intermediate dots -->
      <circle cx="235" cy="148" r="3.5" fill="#64c6b7" opacity="0.55" />
      <circle cx="330" cy="88" r="3.5" fill="#64c6b7" opacity="0.70" />

      <!-- Keyword chips -->
      <rect
        x="32"
        y="238"
        width="114"
        height="22"
        rx="11"
        fill="rgba(223,175,133,0.11)"
        stroke="rgba(223,175,133,0.28)"
        stroke-width="0.75"
      />
      <text
        x="89"
        y="253"
        text-anchor="middle"
        fill="rgba(255,255,255,0.52)"
        font-size="8.5"
        font-family="system-ui,sans-serif"
      >
        digital agency
      </text>

      <rect
        x="154"
        y="238"
        width="96"
        height="22"
        rx="11"
        fill="rgba(100,198,183,0.09)"
        stroke="rgba(100,198,183,0.24)"
        stroke-width="0.75"
      />
      <text
        x="202"
        y="253"
        text-anchor="middle"
        fill="rgba(255,255,255,0.44)"
        font-size="8.5"
        font-family="system-ui,sans-serif"
      >
        b2b website
      </text>

      <rect
        x="258"
        y="238"
        width="102"
        height="22"
        rx="11"
        fill="rgba(255,255,255,0.04)"
        stroke="rgba(255,255,255,0.13)"
        stroke-width="0.75"
      />
      <text
        x="309"
        y="253"
        text-anchor="middle"
        fill="rgba(255,255,255,0.38)"
        font-size="8.5"
        font-family="system-ui,sans-serif"
      >
        brand design
      </text>

      <!-- Metric badge -->
      <rect
        x="32"
        y="278"
        width="178"
        height="46"
        rx="12"
        fill="rgba(100,198,183,0.09)"
        stroke="rgba(100,198,183,0.24)"
        stroke-width="0.75"
      />
      <text
        x="52"
        y="298"
        fill="#64c6b7"
        font-size="11"
        font-weight="700"
        font-family="system-ui,sans-serif"
      >
        ↑ 340%
      </text>
      <text
        x="52"
        y="315"
        fill="rgba(255,255,255,0.38)"
        font-size="8.5"
        font-family="system-ui,sans-serif"
      >
        organic traffic — 6 months
      </text>
    </svg>

    <!-- ── EMAIL: Inbox + campaign preview ── -->
    <svg
      v-else-if="serviceKey === 'email'"
      viewBox="0 0 460 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="visual-svg"
    >
      <rect
        x="16"
        y="16"
        width="428"
        height="328"
        rx="18"
        fill="rgba(15,7,3,0.70)"
        stroke="rgba(255,255,255,0.09)"
        stroke-width="1"
      />

      <!-- Inbox sidebar -->
      <rect
        x="32"
        y="32"
        width="132"
        height="296"
        rx="8"
        fill="rgba(255,255,255,0.025)"
        stroke="rgba(255,255,255,0.08)"
        stroke-width="0.5"
      />
      <text
        x="48"
        y="54"
        fill="rgba(255,255,255,0.45)"
        font-size="9"
        font-weight="600"
        font-family="system-ui,sans-serif"
        letter-spacing="0.08em"
      >
        INBOX
      </text>

      <!-- Inbox item 1 — active -->
      <rect
        x="32"
        y="62"
        width="132"
        height="42"
        rx="4"
        fill="rgba(223,175,133,0.09)"
        stroke="rgba(223,175,133,0.22)"
        stroke-width="0.5"
      />
      <circle cx="51" cy="83" r="9" fill="rgba(223,175,133,0.25)" />
      <rect
        x="66"
        y="77"
        width="84"
        height="5.5"
        rx="2.75"
        fill="rgba(255,255,255,0.50)"
      />
      <rect
        x="66"
        y="88"
        width="64"
        height="4.5"
        rx="2.25"
        fill="rgba(255,255,255,0.22)"
      />

      <!-- Items 2–4 -->
      <circle cx="51" cy="127" r="9" fill="rgba(255,255,255,0.09)" />
      <rect
        x="66"
        y="121"
        width="84"
        height="5.5"
        rx="2.75"
        fill="rgba(255,255,255,0.24)"
      />
      <rect
        x="66"
        y="132"
        width="64"
        height="4.5"
        rx="2.25"
        fill="rgba(255,255,255,0.11)"
      />

      <circle cx="51" cy="170" r="9" fill="rgba(255,255,255,0.07)" />
      <rect
        x="66"
        y="164"
        width="84"
        height="5.5"
        rx="2.75"
        fill="rgba(255,255,255,0.18)"
      />
      <rect
        x="66"
        y="175"
        width="64"
        height="4.5"
        rx="2.25"
        fill="rgba(255,255,255,0.09)"
      />

      <circle cx="51" cy="213" r="9" fill="rgba(255,255,255,0.05)" />
      <rect
        x="66"
        y="207"
        width="84"
        height="5.5"
        rx="2.75"
        fill="rgba(255,255,255,0.14)"
      />
      <rect
        x="66"
        y="218"
        width="64"
        height="4.5"
        rx="2.25"
        fill="rgba(255,255,255,0.07)"
      />

      <!-- Vertical divider -->
      <line
        x1="164"
        y1="32"
        x2="164"
        y2="328"
        stroke="rgba(255,255,255,0.07)"
        stroke-width="0.75"
      />

      <!-- Campaign preview pane -->
      <!-- Header banner -->
      <rect
        x="180"
        y="32"
        width="268"
        height="82"
        rx="8"
        fill="rgba(223,175,133,0.10)"
        stroke="rgba(223,175,133,0.18)"
        stroke-width="0.5"
      />
      <text
        x="314"
        y="77"
        text-anchor="middle"
        fill="rgba(255,255,255,0.55)"
        font-size="10"
        font-weight="300"
        font-family="system-ui,sans-serif"
        letter-spacing="0.14em"
      >
        EYE ON IDEA
      </text>

      <!-- Subject + preheader -->
      <rect
        x="180"
        y="128"
        width="208"
        height="9"
        rx="4.5"
        fill="rgba(255,255,255,0.52)"
      />
      <rect
        x="180"
        y="144"
        width="160"
        height="7.5"
        rx="3.75"
        fill="rgba(255,255,255,0.26)"
      />

      <!-- Body lines -->
      <rect
        x="180"
        y="168"
        width="268"
        height="5.5"
        rx="2.75"
        fill="rgba(255,255,255,0.16)"
      />
      <rect
        x="180"
        y="180"
        width="248"
        height="5.5"
        rx="2.75"
        fill="rgba(255,255,255,0.12)"
      />
      <rect
        x="180"
        y="192"
        width="210"
        height="5.5"
        rx="2.75"
        fill="rgba(255,255,255,0.10)"
      />

      <!-- CTA button -->
      <rect x="206" y="212" width="136" height="30" rx="9" fill="#dfaf85" />
      <text
        x="274"
        y="231"
        text-anchor="middle"
        fill="rgba(30,12,4,0.92)"
        font-size="9"
        font-weight="700"
        font-family="system-ui,sans-serif"
      >
        Read More →
      </text>

      <!-- Metrics row -->
      <line
        x1="180"
        y1="260"
        x2="448"
        y2="260"
        stroke="rgba(255,255,255,0.07)"
        stroke-width="0.75"
      />

      <text
        x="180"
        y="278"
        fill="rgba(255,255,255,0.28)"
        font-size="8"
        font-family="system-ui,sans-serif"
      >
        Open rate
      </text>
      <text
        x="180"
        y="295"
        fill="#64c6b7"
        font-size="14"
        font-weight="700"
        font-family="system-ui,sans-serif"
      >
        38.4%
      </text>

      <text
        x="292"
        y="278"
        fill="rgba(255,255,255,0.28)"
        font-size="8"
        font-family="system-ui,sans-serif"
      >
        Click rate
      </text>
      <text
        x="292"
        y="295"
        fill="#dfaf85"
        font-size="14"
        font-weight="700"
        font-family="system-ui,sans-serif"
      >
        12.1%
      </text>

      <text
        x="398"
        y="278"
        fill="rgba(255,255,255,0.28)"
        font-size="8"
        font-family="system-ui,sans-serif"
      >
        Sent
      </text>
      <text
        x="398"
        y="295"
        fill="rgba(255,255,255,0.52)"
        font-size="14"
        font-weight="700"
        font-family="system-ui,sans-serif"
      >
        4.2k
      </text>
    </svg>

    <!-- ── DOMAIN: Infrastructure chain ── -->
    <svg
      v-else-if="serviceKey === 'domain'"
      viewBox="0 0 460 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="visual-svg"
    >
      <rect
        x="16"
        y="16"
        width="428"
        height="328"
        rx="18"
        fill="rgba(15,7,3,0.70)"
        stroke="rgba(255,255,255,0.09)"
        stroke-width="1"
      />

      <text
        x="230"
        y="50"
        text-anchor="middle"
        fill="rgba(255,255,255,0.22)"
        font-size="9"
        font-family="system-ui,sans-serif"
        letter-spacing="0.18em"
      >
        DOMAIN INFRASTRUCTURE
      </text>

      <!-- Node 1: Domain name -->
      <rect
        x="140"
        y="64"
        width="180"
        height="50"
        rx="12"
        fill="rgba(223,175,133,0.10)"
        stroke="#dfaf85"
        stroke-width="1"
      />
      <text
        x="230"
        y="85"
        text-anchor="middle"
        fill="rgba(255,255,255,0.75)"
        font-size="11"
        font-weight="600"
        font-family="system-ui,sans-serif"
      >
        yourbrand.com
      </text>
      <text
        x="230"
        y="102"
        text-anchor="middle"
        fill="rgba(255,255,255,0.32)"
        font-size="8"
        font-family="system-ui,sans-serif"
      >
        Domain Registration
      </text>

      <!-- Connector 1→2 -->
      <line
        x1="230"
        y1="114"
        x2="230"
        y2="140"
        stroke="rgba(255,255,255,0.18)"
        stroke-width="1"
        stroke-dasharray="3,3"
      />
      <polygon points="230,144 225,136 235,136" fill="rgba(255,255,255,0.18)" />

      <!-- Node 2: DNS -->
      <rect
        x="140"
        y="148"
        width="180"
        height="50"
        rx="12"
        fill="rgba(100,198,183,0.07)"
        stroke="rgba(100,198,183,0.32)"
        stroke-width="0.75"
      />
      <text
        x="230"
        y="168"
        text-anchor="middle"
        fill="rgba(255,255,255,0.65)"
        font-size="11"
        font-weight="600"
        font-family="system-ui,sans-serif"
      >
        DNS Records
      </text>
      <text
        x="230"
        y="186"
        text-anchor="middle"
        fill="rgba(255,255,255,0.28)"
        font-size="8"
        font-family="system-ui,sans-serif"
      >
        A · CNAME · MX · TXT
      </text>

      <!-- Connector 2→3 -->
      <line
        x1="230"
        y1="198"
        x2="230"
        y2="224"
        stroke="rgba(255,255,255,0.18)"
        stroke-width="1"
        stroke-dasharray="3,3"
      />
      <polygon points="230,228 225,220 235,220" fill="rgba(255,255,255,0.18)" />

      <!-- Node 3: SSL -->
      <rect
        x="140"
        y="232"
        width="180"
        height="50"
        rx="12"
        fill="rgba(255,255,255,0.03)"
        stroke="rgba(255,255,255,0.14)"
        stroke-width="0.75"
      />
      <text
        x="230"
        y="252"
        text-anchor="middle"
        fill="rgba(255,255,255,0.60)"
        font-size="11"
        font-weight="600"
        font-family="system-ui,sans-serif"
      >
        SSL / HTTPS
      </text>
      <text
        x="230"
        y="270"
        text-anchor="middle"
        fill="rgba(255,255,255,0.26)"
        font-size="8"
        font-family="system-ui,sans-serif"
      >
        Encrypted · Auto-renewing
      </text>

      <text
        x="230"
        y="316"
        text-anchor="middle"
        fill="rgba(255,255,255,0.20)"
        font-size="8"
        font-family="system-ui,sans-serif"
      >
        Setup · Transfer · Ongoing management
      </text>
    </svg>

    <!-- ── QA: Audit scorecard ── -->
    <svg
      v-else-if="serviceKey === 'qa'"
      viewBox="0 0 460 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="visual-svg"
    >
      <rect
        x="16"
        y="16"
        width="428"
        height="328"
        rx="18"
        fill="rgba(15,7,3,0.70)"
        stroke="rgba(255,255,255,0.09)"
        stroke-width="1"
      />

      <text
        x="230"
        y="50"
        text-anchor="middle"
        fill="rgba(255,255,255,0.22)"
        font-size="9"
        font-family="system-ui,sans-serif"
        letter-spacing="0.18em"
      >
        QUALITY AUDIT REPORT
      </text>

      <!-- Score rows — Performance -->
      <text
        x="36"
        y="86"
        fill="rgba(255,255,255,0.48)"
        font-size="9.5"
        font-family="system-ui,sans-serif"
      >
        Performance
      </text>
      <rect
        x="166"
        y="74"
        width="214"
        height="10"
        rx="5"
        fill="rgba(255,255,255,0.06)"
      />
      <rect
        x="166"
        y="74"
        width="204"
        height="10"
        rx="5"
        fill="rgba(100,198,183,0.55)"
      />
      <text
        x="392"
        y="85"
        fill="#64c6b7"
        font-size="9.5"
        font-weight="700"
        font-family="system-ui,sans-serif"
      >
        95
      </text>

      <!-- Accessibility -->
      <text
        x="36"
        y="116"
        fill="rgba(255,255,255,0.48)"
        font-size="9.5"
        font-family="system-ui,sans-serif"
      >
        Accessibility
      </text>
      <rect
        x="166"
        y="104"
        width="214"
        height="10"
        rx="5"
        fill="rgba(255,255,255,0.06)"
      />
      <rect
        x="166"
        y="104"
        width="192"
        height="10"
        rx="5"
        fill="rgba(100,198,183,0.44)"
      />
      <text
        x="392"
        y="115"
        fill="#64c6b7"
        font-size="9.5"
        font-weight="700"
        font-family="system-ui,sans-serif"
      >
        90
      </text>

      <!-- SEO -->
      <text
        x="36"
        y="146"
        fill="rgba(255,255,255,0.48)"
        font-size="9.5"
        font-family="system-ui,sans-serif"
      >
        SEO Score
      </text>
      <rect
        x="166"
        y="134"
        width="214"
        height="10"
        rx="5"
        fill="rgba(255,255,255,0.06)"
      />
      <rect
        x="166"
        y="134"
        width="208"
        height="10"
        rx="5"
        fill="rgba(223,175,133,0.60)"
      />
      <text
        x="392"
        y="145"
        fill="#dfaf85"
        font-size="9.5"
        font-weight="700"
        font-family="system-ui,sans-serif"
      >
        97
      </text>

      <!-- Best Practices -->
      <text
        x="36"
        y="176"
        fill="rgba(255,255,255,0.48)"
        font-size="9.5"
        font-family="system-ui,sans-serif"
      >
        Best Practices
      </text>
      <rect
        x="166"
        y="164"
        width="214"
        height="10"
        rx="5"
        fill="rgba(255,255,255,0.06)"
      />
      <rect
        x="166"
        y="164"
        width="197"
        height="10"
        rx="5"
        fill="rgba(100,198,183,0.38)"
      />
      <text
        x="392"
        y="175"
        fill="#64c6b7"
        font-size="9.5"
        font-weight="700"
        font-family="system-ui,sans-serif"
      >
        92
      </text>

      <!-- Security -->
      <text
        x="36"
        y="206"
        fill="rgba(255,255,255,0.48)"
        font-size="9.5"
        font-family="system-ui,sans-serif"
      >
        Security
      </text>
      <rect
        x="166"
        y="194"
        width="214"
        height="10"
        rx="5"
        fill="rgba(255,255,255,0.06)"
      />
      <rect
        x="166"
        y="194"
        width="212"
        height="10"
        rx="5"
        fill="rgba(100,198,183,0.55)"
      />
      <text
        x="392"
        y="205"
        fill="#64c6b7"
        font-size="9.5"
        font-weight="700"
        font-family="system-ui,sans-serif"
      >
        99
      </text>

      <!-- Divider -->
      <line
        x1="32"
        y1="226"
        x2="428"
        y2="226"
        stroke="rgba(255,255,255,0.07)"
        stroke-width="0.75"
      />

      <!-- Checklist items -->
      <circle
        cx="48"
        cy="250"
        r="9"
        fill="rgba(100,198,183,0.13)"
        stroke="#64c6b7"
        stroke-width="0.75"
      />
      <text
        x="48"
        y="254"
        text-anchor="middle"
        fill="#64c6b7"
        font-size="9"
        font-weight="700"
        font-family="system-ui,sans-serif"
      >
        ✓
      </text>
      <text
        x="64"
        y="254"
        fill="rgba(255,255,255,0.44)"
        font-size="9"
        font-family="system-ui,sans-serif"
      >
        Core Web Vitals passed
      </text>

      <circle
        cx="48"
        cy="278"
        r="9"
        fill="rgba(100,198,183,0.13)"
        stroke="#64c6b7"
        stroke-width="0.75"
      />
      <text
        x="48"
        y="282"
        text-anchor="middle"
        fill="#64c6b7"
        font-size="9"
        font-weight="700"
        font-family="system-ui,sans-serif"
      >
        ✓
      </text>
      <text
        x="64"
        y="282"
        fill="rgba(255,255,255,0.44)"
        font-size="9"
        font-family="system-ui,sans-serif"
      >
        Mobile responsive verified
      </text>

      <circle
        cx="248"
        cy="250"
        r="9"
        fill="rgba(100,198,183,0.13)"
        stroke="#64c6b7"
        stroke-width="0.75"
      />
      <text
        x="248"
        y="254"
        text-anchor="middle"
        fill="#64c6b7"
        font-size="9"
        font-weight="700"
        font-family="system-ui,sans-serif"
      >
        ✓
      </text>
      <text
        x="264"
        y="254"
        fill="rgba(255,255,255,0.44)"
        font-size="9"
        font-family="system-ui,sans-serif"
      >
        Cross-browser tested
      </text>

      <circle
        cx="248"
        cy="278"
        r="9"
        fill="rgba(100,198,183,0.13)"
        stroke="#64c6b7"
        stroke-width="0.75"
      />
      <text
        x="248"
        y="282"
        text-anchor="middle"
        fill="#64c6b7"
        font-size="9"
        font-weight="700"
        font-family="system-ui,sans-serif"
      >
        ✓
      </text>
      <text
        x="264"
        y="282"
        fill="rgba(255,255,255,0.44)"
        font-size="9"
        font-family="system-ui,sans-serif"
      >
        Schema markup valid
      </text>

      <!-- Summary badge -->
      <rect
        x="32"
        y="302"
        width="164"
        height="30"
        rx="10"
        fill="rgba(223,175,133,0.09)"
        stroke="rgba(223,175,133,0.24)"
        stroke-width="0.75"
      />
      <text
        x="114"
        y="321"
        text-anchor="middle"
        fill="#dfaf85"
        font-size="9"
        font-weight="600"
        font-family="system-ui,sans-serif"
      >
        Full audit report delivered
      </text>
    </svg>
  </div>
</template>

<style scoped>
.visual-frame {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  animation: visualIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes visualIn {
  from {
    opacity: 0;
    transform: translateX(24px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

.visual-svg {
  width: 100%;
  max-width: 480px;
  filter: drop-shadow(0 24px 64px rgba(0, 0, 0, 0.55));
}
</style>
