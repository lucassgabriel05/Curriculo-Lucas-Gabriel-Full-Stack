window.onload = function() {
    const btn = document.getElementById('baixar-curriculo');
    const areaCurriculo = document.getElementById('caixa_principal');

    if (btn) {
        btn.addEventListener('click', function() {
            console.log("Iniciando geração do PDF...");

            const { jsPDF } = window.jspdf;
            
            // 1. Forçamos o scroll para o topo antes de capturar (crucial para mobile)
            window.scrollTo(0, 0);

            html2canvas(areaCurriculo, {
                scale: 2,           // Mantém a qualidade alta
                useCORS: true,      // Permite imagens externas
                allowTaint: false,  // Mantenha false se usar useCORS
                logging: false,
                windowWidth: 1200,  // Engana o navegador fingindo ser um desktop
                scrollY: -window.scrollY // Corrige deslocamentos de scroll
            }).then(canvas => {
                const imgData = canvas.toDataURL('image/jpeg', 1.0);
                const doc = new jsPDF('p', 'pt', 'a5');

                const pdfWidth = doc.internal.pageSize.getWidth();
                const pdfHeight = doc.internal.pageSize.getHeight();

                // Se o conteúdo for maior que uma página A4, ele ajusta proporcionalmente
                doc.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
                doc.save("Curriculo_Lucas_Gabriel_FullStack.pdf");
                
                console.log("PDF Gerado com sucesso!");
            }).catch(err => {
                console.error("Erro no html2canvas:", err);
            });
        });
    } else {
        console.error("Botão 'baixar-curriculo' não encontrado.");
    }
};