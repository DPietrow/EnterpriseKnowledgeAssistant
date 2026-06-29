from dataclasses import dataclass


@dataclass
class TokenEvent:
    token: str


@dataclass
class CitationEvent:
    citations: list


@dataclass
class DoneEvent:
    pass