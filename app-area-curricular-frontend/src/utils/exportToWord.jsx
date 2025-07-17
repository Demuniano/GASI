import { Document, Packer, Paragraph, TextRun, ImageRun, AlignmentType, Header } from 'docx';
import { saveAs } from 'file-saver';
import logoUNAL from '../assets/unalManLogo.png';

export const exportToWord = async ({ idAct, participants, orderPapers, documentStructure, formData }) => {
    console.log('formData', documentStructure);

    const doc = new Document({
        sections: [
            {
                properties: {},
                headers: {
                    default: new Header({
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: `ACTA ${idAct} COMITÉ ASESOR DE PREGRADO`,
                                        font: "Times New Roman",
                                        size: 18, // Tamaño 9 en puntos (18 * 2 = 9 puntos en Word)
                                    }),
                                ],
                                alignment: AlignmentType.LEFT, // Alinear el texto del header a la izquierda
                            }),
                        ],
                    }),
                },
                children: [
                    new Paragraph({
                        children: [
                            new ImageRun({
                                data: await fetch(logoUNAL).then(res => res.arrayBuffer()),
                                transformation: {
                                    width: 300,
                                    height: 150,
                                },
                            }),
                        ],
                        alignment: AlignmentType.CENTER, // Centrar la imagen
                    }),
                    new Paragraph({
                        text: "", // Párrafo vacío para salto de línea
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `ÁREA CURRICULAR DE INFORMÁTICA Y COMPUTACIÓN`,
                                font: "Arial",
                                size: 20, // Tamaño 10 en puntos (20 * 2 = 10 puntos en Word)
                            }),
                        ],
                        alignment: AlignmentType.CENTER, // Centrar el texto del párrafo
                    }),
                    new Paragraph({
                        text: `COMITÉ ASESOR DE PREGRADO`,
                        alignment: AlignmentType.CENTER,
                    }),
                    new Paragraph({
                        text: `ACTA ${idAct}`,
                        alignment: AlignmentType.CENTER,
                    }),
                    new Paragraph({
                        text: "", // Párrafo vacío para salto de línea
                    }),
                    new Paragraph({
                        text: "", // Párrafo vacío para salto de línea
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `Fecha: `,
                                bold: true,
                            }),
                            new TextRun({
                                text: `${formData.date}`,
                            }),
                        ],
                    }),
                    new Paragraph({
                        text: "", // Párrafo vacío para salto de línea
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `Lugar: `,
                                bold: true,
                            }),
                            new TextRun({
                                text: `${formData.place}`,
                            }),
                        ],
                    }),
                    new Paragraph({
                        text: "", // Párrafo vacío para salto de línea
                    }),
                    // Asistentes
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `Asistentes:`,
                                bold: true,
                            }),
                        ],
                    }),
                    ...participants
                        .filter(participant => participant.type === 'asistente')
                        .map(participant => new Paragraph({
                            text: `${participant.role === 'profesor' ? `Prof. ${participant.name}` : participant.name}`,
                            bullet: {
                                level: 0, // Nivel de sangría para la viñeta
                            },
                            indentation: { left: 720 }, // Sangría izquierda
                        })),
                    new Paragraph({
                        text: "", // Párrafo vacío para salto de línea
                    }),
                    // Invitados
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `Invitados:`,
                                bold: true,
                            }),
                        ],
                    }),
                    ...participants
                        .filter(participant => participant.type === 'invitado')
                        .map(participant => new Paragraph({
                            text: `${participant.role === 'profesor' ? `Prof. ${participant.name}` : participant.name}`,
                            bullet: {
                                level: 0,
                            },
                            indentation: { left: 720 },
                        })),
                    new Paragraph({
                        text: "", // Párrafo vacío para salto de línea
                    }),
                    // Ausentes
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `Ausentes:`,
                                bold: true,
                            }),
                        ],
                    }),
                    ...participants
                        .filter(participant => participant.type === 'ausente')
                        .map(participant => new Paragraph({
                            text: `${participant.role === 'profesor' ? `Prof. ${participant.name}` : participant.name}`,
                            bullet: {
                                level: 0,
                            },
                            indentation: { left: 720 },
                        })),
                    new Paragraph({
                        text: "", // Párrafo vacío para salto de línea
                    }),
                    // Orden del Día
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `ORDEN DEL DÍA:`,
                                bold: true,
                            }),
                        ],
                    }),
                    ...orderPapers.map((orderPaper, index) => [
                        new Paragraph({
                            text: `${index + 1}. ${orderPaper.description}`,
                            spacing: { after: 200 }, // Espacio después de cada elemento
                            indentation: { left: 720 }, // Espacio a la izquierda
                        }),
                        new Paragraph({
                            text: `Recomendación: ${orderPaper.recommendation || 'No disponible'}`,
                            indentation: { left: 720 }, // Sangría izquierda
                        }),
                        new Paragraph({
                            text: "", // Párrafo vacío para salto de línea
                        }),
                    ]).flat(),
                    new Paragraph({
                        text: "", // Párrafo vacío para salto de línea
                    }),
                    // Desarrollo
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `DESARROLLO:`,
                                bold: true,
                            }),
                        ],
                    }),
                    new Paragraph({
                        text: "", // Párrafo vacío para salto de línea
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: documentStructure.quorum,
                            }),
                        ],
                    }),
                    new Paragraph({
                        text: "", // Párrafo vacío para salto de línea
                    }),
                    // Asuntos Estudiantiles
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "ASUNTOS ESTUDIANTILES",
                                bold: true,
                            }),
                        ],
                    }),
                    new Paragraph({
                        text: "", // Párrafo vacío para salto de línea
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "SOLICITUDES MODULO SIASE:",
                                bold: true,
                            }),
                        ],
                    }),
                    ...documentStructure.studentAffairs.siaRequests.map((request, index) =>
                        [
                            new Paragraph({
                                text: `${index + 1}. ${request.description}`,
                                bullet: { level: 0 },
                            }),
                            new Paragraph({
                                text: `Recomendación: ${request.recommendation || ''}`,
                                indentation: { left: 720 }, // Sangría izquierda
                            }),
                            new Paragraph({
                                text: "", // Párrafo vacío para salto de línea
                            }),
                        ]
                    ).flat(),
                    new Paragraph({
                        text: "", // Párrafo vacío para salto de línea
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "SOLICITUDES MANUALES:",
                                bold: true,
                            }),
                        ],
                    }),
                    ...documentStructure.studentAffairs.manualRequests.map((request, index) =>
                        [
                            new Paragraph({
                                text: `${index + 1}. ${request.description}`,
                                spacing: { after: 200 },
                                indentation: { left: 720 },
                            }),
                            new Paragraph({
                                text: `Recomendación: ${request.recommendation || ''}`,
                                indentation: { left: 720 }, // Sangría izquierda
                            }),
                            new Paragraph({
                                text: "", // Párrafo vacío para salto de línea
                            }),
                        ]
                    ).flat(),
                    new Paragraph({
                        text: "", // Párrafo vacío para salto de línea
                    }),
                    // Recomendación General
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "RECOMENDACIÓN GENERAL:",
                                bold: true,
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: documentStructure.recommendation,
                            }),
                        ],
                    }),
                    new Paragraph({
                        text: "", // Párrafo vacío para salto de línea
                    }),
                    // Varios
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "VARIOS:",
                                bold: true,
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: documentStructure.various.join("\n"), // Suponiendo que `various` es un array de strings
                            }),
                        ],
                    }),
                    new Paragraph({
                        text: "", // Párrafo vacío para salto de línea
                    }),
                    // Firma
                    new Paragraph({
                        text: `Luz Angela Aristizabal`,
                    }),
                    new Paragraph({
                        text: `Presidente`,
                    }),
                    new Paragraph({
                        text: `Comité Asesor de Pregrado`,
                    }),
                ],
            },
        ],
    });

    Packer.toBlob(doc).then(blob => {
        saveAs(blob, `Acta_${idAct}.docx`);
    }).catch(err => console.log(err));
};
