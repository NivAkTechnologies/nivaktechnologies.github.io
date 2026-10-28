"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const target = document.querySelector(".services-workspace__typing");
  const viewport = document.querySelector(".services-workspace__code");

  if (!target || !viewport) return;

  // Valid Flutter example: a complete interactive counter application.
  const source = [
    "import 'package:flutter/material.dart';",
    "",
    "void main() {",
    "  runApp(const NivAkApp());",
    "}",
    "",
    "class NivAkApp extends StatelessWidget {",
    "  const NivAkApp({super.key});",
    "",
    "  @override",
    "  Widget build(BuildContext context) {",
    "    return MaterialApp(",
    "      debugShowCheckedModeBanner: false,",
    "      title: 'NivAk Technologies',",
    "      theme: ThemeData(",
    "        colorScheme: ColorScheme.fromSeed(",
    "          seedColor: Colors.blue,",
    "        ),",
    "      ),",
    "      home: const CounterScreen(),",
    "    );",
    "  }",
    "}",
    "",
    "class CounterScreen extends StatefulWidget {",
    "  const CounterScreen({super.key});",
    "",
    "  @override",
    "  State<CounterScreen> createState() =>",
    "      _CounterScreenState();",
    "}",
    "",
    "class _CounterScreenState extends State<CounterScreen> {",
    "  int count = 0;",
    "",
    "  void increment() {",
    "    setState(() => count++);",
    "  }",
    "",
    "  @override",
    "  Widget build(BuildContext context) {",
    "    return Scaffold(",
    "      appBar: AppBar(",
    "        title: const Text('NivAk Technologies'),",
    "      ),",
    "      body: Center(",
    "        child: Text(",
    "          'Count: $count',",
    "          style: const TextStyle(fontSize: 28),",
    "        ),",
    "      ),",
    "      floatingActionButton: FloatingActionButton(",
    "        onPressed: increment,",
    "        child: const Icon(Icons.add),",
    "      ),",
    "    );",
    "  }",
    "}"
  ].join("\n");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  const tokenPattern =
    /(\b(?:import|void|class|const|final|int|return|new|extends|override|super|this)\b|\b(?:Widget|State|StatelessWidget|StatefulWidget|BuildContext|MaterialApp|ThemeData|ColorScheme|Scaffold|AppBar|Center|Text|TextStyle|FloatingActionButton|Icon|Colors|Icons|CounterScreen|NivAkApp)\b|'(?:[^'\\]|\\.)*'|\b\d+\b)/g;

  function highlight(code) {
    const fragment = document.createDocumentFragment();
    let previous = 0;

    tokenPattern.lastIndex = 0;

    for (const match of code.matchAll(tokenPattern)) {
      if (match.index > previous) {
        fragment.append(
          document.createTextNode(code.slice(previous, match.index))
        );
      }

      const value = match[0];
      const span = document.createElement("span");

      if (value.startsWith("'")) {
        span.className = "code-token-string";
      } else if (/^\d+$/.test(value)) {
        span.className = "code-token-number";
      } else if (/^[A-Z]/.test(value)) {
        span.className = "code-token-type";
      } else {
        span.className = "code-token-keyword";
      }

      span.textContent = value;
      fragment.append(span);
      previous = match.index + value.length;
    }

    if (previous < code.length) {
      fragment.append(document.createTextNode(code.slice(previous)));
    }

    target.replaceChildren(fragment);
  }

  let position = 0;
  let timer = null;

  function stop() {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
  }

  function scrollToCurrentLine() {
    viewport.scrollTop = viewport.scrollHeight;
  }

  function tick() {
    if (reducedMotion.matches) {
      highlight(source);
      scrollToCurrentLine();
      return;
    }

    if (document.hidden) {
      timer = setTimeout(tick, 500);
      return;
    }

    if (position >= source.length) {
      timer = setTimeout(restart, 3500);
      return;
    }

    const character = source[position];
    position += 1;

    highlight(source.slice(0, position));
    scrollToCurrentLine();

    timer = setTimeout(
      tick,
      character === "\n" ? 180 : 22
    );
  }

  function restart() {
    stop();
    position = 0;
    target.textContent = "";
    viewport.scrollTop = 0;

    if (reducedMotion.matches) {
      highlight(source);
    } else {
      tick();
    }
  }

  reducedMotion.addEventListener("change", restart);
  window.addEventListener("pagehide", stop);

  restart();
});
