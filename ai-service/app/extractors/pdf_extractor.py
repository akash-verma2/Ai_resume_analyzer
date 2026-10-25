import io
import re
from pypdf import PdfReader

def extract_text_from_pdf(file_bytes: bytes) -> str:
    """Extract clean text content from PDF binary stream."""
    try:
        reader = PdfReader(io.BytesIO(file_bytes))
        extracted_pages = []
        for i, page in enumerate(reader.pages):
            text = page.extract_text() or ""
            if text.strip():
                extracted_pages.append(text.strip())
        
        full_text = "\n\n".join(extracted_pages)
        # Normalize excessive whitespace while preserving newlines
        full_text = re.sub(r'[ \t]+', ' ', full_text)
        full_text = re.sub(r'\n{3,}', '\n\n', full_text)
        return full_text.strip()
    except Exception as e:
        raise ValueError(f"Failed to parse PDF document: {str(e)}")
