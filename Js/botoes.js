window.onload = function() {
    const btn = document.getElementById('baixar-curriculo');
    const areaCurriculo = document.getElementById('caixa_principal');

    if (btn) {
        btn.addEventListener('click', function() {
            console.log("Iniciando geração do PDF...");

            // Usamos a sintaxe correta para a versão nova do jsPDF
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF('p', 'pt', 'a4');

            html2canvas(areaCurriculo, {
                scale: 2,
                useCORS: true,
                allowTaint: true
            }).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                
                const pdfWidth = doc.internal.pageSize.getWidth();
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

                doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                doc.save("Curriculo_Lucas_Gabriel_FullStack.pdf");
                console.log("PDF Gerado com sucesso!");
            }).catch(err => {
                console.error("Erro no html2canvas:", err);
            });
        });
    } else {
        console.error("Botão 'baixar-curriculo' não encontrado no HTML.");
    }
};